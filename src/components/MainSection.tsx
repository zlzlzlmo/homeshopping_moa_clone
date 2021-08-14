import React from "react";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import queryString from "query-string";
import {
  deleteHypenFromDate,
  setQueryStringParameter,
  todayToString,
} from "./util/date";
import { categoryList, companyImg } from "../data/data";
import Product from "./Product";
import { getProductsFromMoa } from "./util/product";
import { useAppDispatch, useAppSelector } from "../redux/configStore";
import { setProduct, getProducts } from "../redux/modules/product";
import { filterProducts } from "./util/filter";
const MainSection = () => {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [clickDateIdx, setClickDateIdx] = useState<number>(0);
  const [clickShoppingCompany, setClickShoppingCompany] = useState<number>(0);
  const [clickCategory, setClickCategory] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const parsed = queryString.parse(window.location.search);

  const handleClickDate = (date: string, index: number) => {
    const noHypeDate = deleteHypenFromDate(date);
    setQueryStringParameter("date", noHypeDate);
    setClickDateIdx(index + 1);
    getProductsFromMoa(noHypeDate).then((result) => {
      dispatch(setProduct(result));
      setFilteredProducts(result);
    });
  };

  const handleFilter = (
    company: string | null = null,
    cate: string | null = null
  ) => {
    let newSCfilter: any[] = [];
    if (company) {
      let newF = filter.filter(
        (item) => item[0].indexOf("shopping_company") === -1
      );
      if (company === "homeshopping" || company === "tcommerce2") {
        newSCfilter = [...newF, ["shopping_kind", company]];
      } else {
        newSCfilter = [...newF, ["shopping_company", company]];
      }
    }
    if (cate) {
      let newF = filter.filter((item) => item[0].indexOf("category") === -1);
      newSCfilter = [...newF, ["category", cate]];
    }
    setFilter([...newSCfilter]);
    setFilteredProducts(filterProducts(products, [...newSCfilter]));
  };

  const handleClickShoppingCompany = (company: string, index: number) => {
    setQueryStringParameter("site", company);
    setClickShoppingCompany(index + 1);
    handleFilter(company, null);
  };

  const handleClickCategory = (cate: string, index: number) => {
    setQueryStringParameter("cate", cate);
    setClickCategory(index + 1);
    handleFilter(null, cate);
  };

  const setFilterIndexFromQueryString = (newDateRange: string[]) => {
    if (parsed.date !== undefined) {
      const dateFromQuery =
        newDateRange.indexOf(todayToString(Number(parsed.date))) + 1;
      setClickDateIdx(dateFromQuery);
    } else {
      setClickDateIdx(6);
    }

    const shoppingCompanyFromQuery = companyImg.findIndex((item, i) => {
      return item["type"] === parsed.site;
    });
    setClickShoppingCompany(shoppingCompanyFromQuery + 1);

    const categoryFromQuery = categoryList.findIndex((item, i) => {
      return item["type"] === parsed.cate;
    });
    setClickCategory(categoryFromQuery + 1);
  };

  useEffect(() => {
    if (parsed.date !== null) {
      getProductsFromMoa(parsed.date as string).then((result) => {
        dispatch(setProduct(result));
        setFilteredProducts(result);
      });
    }

    dayjs.locale("ko");
    let today = parseInt(dayjs().format("YYYYMMDD"));
    let newDateRange = Array.from({ length: 11 }, (v, i) =>
      todayToString(today + i - 5)
    );
    setDateRange(newDateRange);

    setFilterIndexFromQueryString(newDateRange);
  }, []);

  const testArray = Array.from({ length: 400 }, () => {});

  if (filteredProducts.length === 0) {
    return (
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <img src="/images/loading.svg" alt="" />
      </div>
    );
  } else {
    return (
      <Container>
        <LeftSection>
          {filteredProducts?.map((item: any, index: any) => (
            <Product key={index} item={item}></Product>
          ))}
        </LeftSection>
        <RightSection>
          <RightSectionFixed>
            <Title>편성표 날짜 선택</Title>
            <DatePick>
              {dateRange.map((item, index) => {
                if (item === dayjs().format("YYYY-MM-DD")) {
                  return (
                    <Date
                      key={index}
                      clickDateIdx={clickDateIdx}
                      today
                      onClick={() => handleClickDate(item, index)}
                    >
                      {dayjs(item).format("M월D일 (오늘)")}
                    </Date>
                  );
                }
                return (
                  <Date
                    key={index}
                    clickDateIdx={clickDateIdx}
                    today={false}
                    onClick={() => handleClickDate(item, index)}
                  >
                    {dayjs(item).format("M월D일 (ddd)")}
                  </Date>
                );
              })}
            </DatePick>
            <Title>쇼핑사 선택 선택</Title>
            <DatePick>
              {companyImg.map((item, index) => {
                if (Object.keys(item).includes("title")) {
                  return (
                    <ShoppingCompany
                      key={index}
                      image={false}
                      clickShoppingCompany={clickShoppingCompany}
                      onClick={() =>
                        handleClickShoppingCompany(item.type, index)
                      }
                    >
                      {item.title}
                    </ShoppingCompany>
                  );
                }
                return (
                  <ShoppingCompany
                    key={index}
                    image={item.style}
                    clickShoppingCompany={clickShoppingCompany}
                    onClick={() => handleClickShoppingCompany(item.type, index)}
                  />
                );
              })}
            </DatePick>
            <Title>카테고리 선택</Title>

            <DatePick>
              {categoryList.map(({ title, type }, index) => {
                return (
                  <Category
                    key={index}
                    clickCategory={clickCategory}
                    onClick={() => handleClickCategory(type, index)}
                  >
                    {title}
                  </Category>
                );
              })}
            </DatePick>
          </RightSectionFixed>
        </RightSection>
      </Container>
    );
  }
};

const Container = styled.div`
  min-width: 900px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
`;

const LeftSection = styled.section`
  padding-top: 20px;
`;
const RightSection = styled.section`
  margin-left: auto;
  width: 311px;
  height: 100vh;
  border-left: 1px solid #ddd;
  position: relative;
`;

const RightSectionFixed = styled.div`
  position: sticky;
  padding: 14px 16px;
  right: 0;
  top: 76px;
`;

const Title = styled.div``;

const DatePick = styled.div`
  width: 278px;
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10px 0;
`;

type DateType = {
  today: boolean;
  clickDateIdx: number;
};

const BorderInDiv = css`
  &:nth-child(3n + 1),
  &:nth-child(3n + 2) {
    border-right: 1px solid #eee;
  }
  border-bottom: 1px solid #eee;
  width: 92px;
  cursor: pointer;
  text-align: center;
`;

const ClickedStatus = css`
  &:after {
    content: "";
    width: 18px;
    height: 18px;
    background: url(http://hsmoa.com/media/img/mobile/check_mark_on.png)
      no-repeat 50% 50%;
    background-size: 18px 18px;
    z-index: 9;
    position: absolute;
    right: 2px;
    top: 2px;
  }
  background-color: #f5f5f5 !important;
`;
const Date = styled.div<DateType>`
  font-size: ${({ today }) => (today ? "13px" : "12px")};
  color: ${({ today }) => (today ? "#45ADA6" : "#666")};
  ${({ clickDateIdx }) =>
    clickDateIdx &&
    `&:nth-child(${clickDateIdx}) {
        background-color:#E2404F;
        color:#fff;
  }`};

  padding: 9px 0;
  ${BorderInDiv}
`;

type ShoppingCompanyType = {
  image: string | boolean | undefined;
  clickShoppingCompany: number;
};
const ShoppingCompany = styled.div<ShoppingCompanyType>`
  height: 38px;
  ${BorderInDiv}
  ${({ image }) =>
    image
      ? `background-image:url(${image})`
      : `line-height : 38px; font-size:14px`};
  background-size: 65px 25px;
  background-repeat: no-repeat !important;
  background-position: center;
  position: relative;

  ${({ clickShoppingCompany }) =>
    clickShoppingCompany &&
    `&:nth-child(${clickShoppingCompany}) {
          ${ClickedStatus}
  }`};
`;

type CategoryType = {
  clickCategory: number;
};
const Category = styled.div<CategoryType>`
  ${BorderInDiv}
  line-height : 36px;
  font-size: 14px;
  color: #666;
  position: relative;

  ${({ clickCategory }) =>
    clickCategory &&
    `&:nth-child(${clickCategory}) {
          ${ClickedStatus}
  }`};
`;
export default MainSection;
