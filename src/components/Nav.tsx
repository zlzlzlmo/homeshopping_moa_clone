import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { search_rank } from "../data/search";
const Nav = () => {
  const [searchBottom, setSearchBottom] = useState<string>("0%");
  useEffect(() => {
    let index = 0;
    setInterval(() => {
      if (index === 10) index = 0;
      let newSearchBottom = index * 100 + "%";
      index++;
      setSearchBottom(newSearchBottom);
    }, 3000);
  }, []);
  return (
    <NavContainer>
      <Logo />
      <SearchBox>
        <SearchInput placeholder="홈쇼핑 상품 검색" />
        <SearchIcon />
      </SearchBox>
      <SearchRankContainer>
        <SearchRankWrapper searchBottom={searchBottom}>
          {search_rank.map(({ word, hits }, index) => (
            <SearchRank key={index}>
              <div>
                <span className="rank">{index + 1}.</span>
                <span className="word">{word}</span>
                <span className="count">
                  {hits}
                  <span> hits</span>
                </span>
              </div>
            </SearchRank>
          ))}
        </SearchRankWrapper>
      </SearchRankContainer>
      <Ad>
        <img src="http://hsmoa.com/media/img/web/ad_button.png" alt="" />
      </Ad>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 76px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  background-image: url("http://hsmoa.com/media/img/web/logo_hsmoa.png");
  width: 124px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SearchBox = styled.div`
  border: 2px solid #ea1d27;
  width: auto;
  margin: 9px;
`;

const SearchInput = styled.input`
  border: 0;
  font-size: 16px;
  height: 40px;
  padding-left: 10px;
  width: 270px;
  outline: none;
`;

const SearchIcon = styled.a`
  background-image: url("http://hsmoa.com/media/img/2016/nav_search.png");
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: contain;
  vertical-align: middle;
  margin: 0 10px;
`;

const SearchRankContainer = styled.div`
  width: 20vw;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

type SearchRankWrapperType = {
  searchBottom: string;
};
const SearchRankWrapper = styled.div<SearchRankWrapperType>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;

  bottom: ${({ searchBottom }) => searchBottom && searchBottom};
`;

const SearchRank = styled.div`
  height: 100%;
  line-height: 76px;

  box-sizing: border-box;
  div {
    display: inline-grid;
    grid-template-columns: 28px 120px 52px;
    margin-right: auto;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  span {
    line-height: 31px;
  }
  .rank {
    color: #ea1b27;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .word {
    font-weight: 600;
    font-size: 1.1rem;
    text-align: left;
    white-space: nowrap;
  }
  .count {
    color: gray;
    white-space: nowrap;
  }
`;

const Ad = styled.div`
  margin-left: auto;
  img {
    display: inline-block;
    width: 12vw;
    height: 6vh;
    border-radius: 4px;
  }
`;
export default Nav;
