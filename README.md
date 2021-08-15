# 링크드인 클론 코딩

[프로젝트 보러가기! 👍](https://homemoa-feea9.web.app/)

## 사용언어는 ?

> React, TypeScript

## 사용 패키지 || 라이브러리는 ?

> react-router-dom, styled-components, redux-toolkit, dayjs, axios, cheerio, material-ui

## 👀 어떤 모습으로 개발이 되었나?

![](https://images.velog.io/images/hoon_dev/post/88d743b9-ab9b-45fe-a5c1-73cf5c73679d/image.png)

## 🕹 구현 기능

- 실시간 인기 검색어 롤링
- axios, cheerio를 이용하여 홈쇼핑모아 데이터 크롤링 후 Redux에 담기
- 현재 오늘 날짜를 기준으로 전후 5일 편성표 날짜 선택 자동으로 업데이트
- 쇼핑사 선택 및 카테고리 선택 필터
- 페이지 새로고침시 쿼리스트링 데이터를 이용하여 필터 유지
- 오늘날 현재 방송중인 홈쇼핑은 현재 방송중이라는 텍스트 출력
- 오늘날 현재 방송중 이전 방송은 미출력 -> 이전방송 보기 클릭시 이전 방송들 보이기
- 홈쇼핑 상품 목록 클릭시 해당 상품 상세페이지(실제 홈쇼핑모아)로 연결

---

## 코드 살펴보기

### 1. 인기검색어 롤링

```ts
useEffect(() => {
  let index = 0;
  setInterval(() => {
    if (index === 10) index = 0;
    let newSearchBottom = index * 100 + "%";
    index++;
    setSearchBottom(newSearchBottom);
  }, 3000);
}, []);
```

- 인기검색어 담겨있는 박스 3초마다 position 위치 변경

### 2. 데이터 크롤링

```ts
export const getProductsFromMoa = async (date: string | undefined) => {
  let shoppingList: any[] = [];
  let todayFormat: string = todayToString(Number(date));
  const response = await axios
    .get(`https://www.hsmoa.com/?date=${date}`)
    .then((html) => {
      const $ = cheerio.load(html.data);
      const bodyList = $(".timeline-group > div.timeline-item");
      bodyList.each(function (i, elem) {
        let company = $(this).attr("class")?.split(" ")[1];
        let company_logo = companyImg.find((item) => {
          return item.type === company;
        })?.style;

        let broadTime = $(this)
          .children("a")
          .children(".display-table")
          .children("div:nth-child(3)")
          .children("span.font-12.c-midgray")
          .text()
          .replace(/(\r\n|\n|\r)/gm, "")
          .replaceAll(" ", "")
          .split("~");
        let object = {
          title: $(this)
            .children("a")
            .children("div.display-table")
            .children("div:nth-child(3)")
            .children("div.font-15")
            .text()
            .trim(),
          image: $(this)
            .children("a")
            .children(".display-table")
            .children("div:nth-child(1)")
            .children("img")
            .attr("data-src"),
          price: $(this)
            .children("a")
            .children(".display-table")
            .children("div:nth-child(3)")
            .children("span.strong.font-17.c-black ")
            .text()
            .trim(),
          time: {
            start: broadTime[0],
            end: broadTime[1],
          },
          is_broadcasting: getBroadcasting(
            todayFormat,
            broadTime[0],
            broadTime[1]
          ),
          shopping_company: company,
          shopping_kind: $(this).attr("class")?.split(" ")[3],
          company_logo: company_logo,
          category: $(this).attr("class")?.split(" ")[2],
          link: $(this).children("a").attr("href"),
        };

        shoppingList.push(object);
      });
      return shoppingList;
    });

  return response;
};
```

- 날짜 필터 클릭시 해당 날짜 방송분 홈쇼핑 상품 목록들 크롤링 해오기

### 3. 방송 시간과 현재 시간과 비교해서 현재 방송중 알아내기

```ts
class ExtractHourAndMin {
  time = "";
  hourIdx = 0;
  minIdx = 0;
  constructor(time: string) {
    this.time = time;
    this.hourIdx = time.indexOf("시");
    this.minIdx = time.indexOf("분");
  }
  getHour() {
    return Number(this.time.slice(0, this.hourIdx));
  }
  getMin() {
    return Number(this.time.slice(this.hourIdx + 1, this.minIdx));
  }
}

export const getBroadcasting = (
  todayFormat: string,
  start_time: string,
  end_time: string
) => {
  let todayJs = dayjs().format("YYYY-MM-DD");
  if (start_time === null || start_time === "" || start_time === undefined)
    return true;
  if (end_time === null || end_time === "" || end_time === undefined)
    return true;
  let nowTime = new ExtractHourAndMin(dayjs().format("H시m분"));
  let nowHour = nowTime.getHour();
  let nowMin = nowTime.getMin();

  let startTime = new ExtractHourAndMin(start_time);
  let startHour = startTime.getHour();
  let startMin = startTime.getMin();

  let endTime = new ExtractHourAndMin(end_time);

  let endHour = endTime.getHour();
  let endMin = endTime.getMin();

  if (todayFormat === todayJs) {
    if (startHour === nowHour) {
      if (startMin <= nowMin) {
        return true;
      }
    }

    if (endHour === nowHour) {
      if (nowMin <= endMin) {
        return true;
      }
    }
  }
  return false;
};
```

- class 객체를 만들어 생성자 변수의 시간과 분을 출력 -> 현재 시간, 해당 상품 홈쇼핑 방송 시작 시간 및 종료 시간을 인스턴스에 담아 각 날짜 비교 후 현재 시간이 시작 시간과 종료 시간 사이에 해당하면 true를 반환하여 홈쇼핑 방송 product의 상품 is_broadcasting 값에 true를 넣음 -> 해당 key값이 true면 현재 방송중 출력

### 4. 동적 필터

```ts
export const filterProducts = (data: ProductState[], filters: string[]) => {
  return data.filter((item: any) => {
    let result = true;
    for (let i = 0; i < filters.length; i++) {
      if (item[filters[i][0]] !== filters[i][1]) result = false;
    }
    return result;
  });
};
```

- 동적 필터 함수를 생성하여 홈쇼핑 회사와 카테고리 선택시 동적으로 Product 상태값을 원하는 데이터로 필터링

### 5. 필터 클릭시 쿼리스트링 파싱

```ts
export const setQueryStringParameter = (name: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};
```

- 필터 클릭시 해당 필터 name value를 url로 파싱( 새로 고침시 필터 유지를 위함 )

---

😎 감사합니다 :)
