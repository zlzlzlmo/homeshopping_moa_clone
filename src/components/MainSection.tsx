import React from "react";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import queryString from "query-string";
import {
  deleteHypenFromDate,
  deleteQueryStringParameter,
  setQueryStringParameter,
  todayToString,
} from "./util/date";
import { categoryList, companyImg } from "../data/data";
import Product from "./Product";
import { getProductsFromMoa } from "./util/product";
import { useAppDispatch, useAppSelector } from "../redux/configStore";
import {
  setProduct,
  getProducts,
  ProductState,
} from "../redux/modules/product";
import { filterProducts } from "./util/filter";
import LinearProgress from "@material-ui/core/LinearProgress";
import NoProduct from "./NoProduct";

const MainSection = () => {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [clickDateIdx, setClickDateIdx] = useState<number>(0);
  const [clickShoppingCompany, setClickShoppingCompany] = useState<number>(1);
  const [clickCategory, setClickCategory] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<ProductState[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBeforeBroad, setShowBeforeBroad] = useState<boolean>(false);
  const [beforeProducts, setBeforeProducts] = useState<ProductState[]>([]);
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const parsed = queryString.parse(window.location.search);
  const today = parseInt(dayjs().format("YYYYMMDD"));
  let filterArray: any[] = [];

  const NotShowBeforeThisTime = (date: string, result: ProductState[]) => {
    if (date === undefined || date.replaceAll("-", "") === today.toString()) {
      setShowBeforeBroad(true);
      let index = result.findIndex(
        (item: ProductState) => item.is_broadcasting === true
      );
      let beforeProductArray = result.slice(0, index);
      let newResult = result.slice(index);

      setBeforeProducts(beforeProductArray);
      dispatch(setProduct(newResult));
      setFilteredProducts(filterProducts(newResult, [...filterArray]));
    } else {
      setShowBeforeBroad(false);
      dispatch(setProduct(result));
      setFilteredProducts(filterProducts(result, [...filterArray]));
    }
  };

  const handleShowBeforePB = () => {
    setShowBeforeBroad(false);
    setFilteredProducts(
      filterProducts([...beforeProducts, ...filteredProducts], [...filter])
    );
  };

  const handleClickDate = (date: string, index: number) => {
    setLoading(true);
    const noHypeDate = deleteHypenFromDate(date);
    setClickCategory(1);
    setClickShoppingCompany(1);
    deleteQueryStringParameter("site");
    deleteQueryStringParameter("cate");
    setQueryStringParameter("date", noHypeDate);
    setClickDateIdx(index + 1);
    getProductsFromMoa(noHypeDate).then((result) => {
      NotShowBeforeThisTime(date, result);
      setLoading(false);
    });
  };

  const handleFilter = (
    company: string | null = null,
    cate: string | null = null
  ) => {
    setShowBeforeBroad(true);
    let newSCfilter: any[] = [];
    if (company || company === "") {
      let newF = filter.filter(
        (item) =>
          item[0].indexOf("shopping_company") === -1 &&
          item[0].indexOf("shopping_kind") === -1
      );
      if (company === "") {
        newSCfilter = [...newF];
      } else if (company === "homeshopping" || company === "tcommerce2") {
        newSCfilter = [...newF, ["shopping_kind", company]];
      } else {
        newSCfilter = [...newF, ["shopping_company", company]];
      }
    }

    if (cate || cate === "") {
      let newF = filter.filter((item) => item[0].indexOf("category") === -1);
      if (cate === "") {
        newSCfilter = [...newF];
      } else {
        newSCfilter = [...newF, ["category", cate]];
      }
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
    if (parsed.cate !== undefined && parsed.cate !== "") {
      filterArray.push(["category", parsed.cate]);
    }
    if (parsed.site !== undefined && parsed.site !== "") {
      if (parsed.site === "homeshopping" || parsed.site === "tcommerce2") {
        filterArray.push(["shopping_kind", parsed.site]);
      } else {
        filterArray.push(["shopping_company", parsed.site]);
      }
    }

    if (parsed.date !== null) {
      getProductsFromMoa(parsed.date as string).then((result) => {
        NotShowBeforeThisTime(parsed.date as string, result);
        setLoading(false);
      });
    }

    dayjs.locale("ko");
    let newDateRange = Array.from({ length: 11 }, (v, i) =>
      todayToString(today + i - 5)
    );

    setFilter(filterArray);
    setDateRange(newDateRange);
    setFilterIndexFromQueryString(newDateRange);
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <LinearProgress />
      </div>
    );
  } else {
    return (
      <Container>
        {filteredProducts.length === 0 ? (
          <NoProduct />
        ) : (
          <LeftSection>
            {showBeforeBroad && (
              <div>
                <ShowBeforeBroadBtn onClick={() => handleShowBeforePB()}>
                  ???????????? ??????
                </ShowBeforeBroadBtn>
              </div>
            )}

            {filteredProducts?.map((item: any, index: any) => (
              <Product key={index} item={item}></Product>
            ))}
          </LeftSection>
        )}

        <RightSection>
          <RightSectionFixed>
            <Title>????????? ?????? ??????</Title>
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
                      {dayjs(item).format("M???D??? (??????)")}
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
                    {dayjs(item).format("M???D??? (ddd)")}
                  </Date>
                );
              })}
            </DatePick>
            <Title>????????? ??????</Title>
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
            <Title>???????????? ??????</Title>

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
  justify-content: flex-end;
`;

const ShowBeforeBroadBtn = styled.div`
  cursor: pointer;
  width: 200px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  margin: auto;
  font-size: 14px;
  font-weight: bolder;
  background-color: #f25862;
  margin-bottom: 10px;
`;

const LeftSection = styled.section`
  padding-top: 20px;
  margin-right: 200px;
`;
const RightSection = styled.section`
  width: 311px;
  height: 100vh;
  position: relative;
  border-left: 1px solid #ddd;
`;

const RightSectionFixed = styled.div`
  position: fixed;
  padding: 14px 16px;
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
