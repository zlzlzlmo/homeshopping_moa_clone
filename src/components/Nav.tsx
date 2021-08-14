import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { search_rank } from "../data/data";
const Nav = () => {
  const [searchBottom, setSearchBottom] = useState<string>("0%");
  const [rankPopShow, setRankPopShow] = useState<boolean>(false);
  const history = useHistory();
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
    <Container>
      <NavContainer>
        <Logo
          onClick={() => {
            history.replace("/");
            window.location.reload();
          }}
        />
        <SearchBox>
          <SearchInput placeholder="홈쇼핑 상품 검색" />
          <SearchIcon />
        </SearchBox>
        <SearchRankGrid
          onMouseEnter={() => setRankPopShow(true)}
          onMouseLeave={() => setRankPopShow(false)}
        >
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
          <RankPopUpBox rankPopShow={rankPopShow}>
            <div className="title">인기검색어</div>
            {search_rank.map(({ word, hits }, index) => (
              <div className="query_real_time" key={index}>
                <span className="rank">{index + 1}.</span>
                <span className="word">{word}</span>
                <span className="count">
                  {hits}
                  <span> hits</span>
                </span>
              </div>
            ))}
          </RankPopUpBox>
        </SearchRankGrid>
        <Ad>
          <img src="http://hsmoa.com/media/img/web/ad_button.png" alt="" />
        </Ad>
      </NavContainer>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 0px 4px rgb(0 0 0 / 15%);
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
`;

const NavContainer = styled.div`
  height: 76px;
  min-width: 900px;
  max-width: 1200px;
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
  cursor: pointer;
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

const SearchRankGrid = styled.div`
  width: 20vw;
  height: 100%;
  position: relative;
`;

const SearchRankContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
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
    grid-template-columns: 29px 125px 54px;
    margin-right: auto;
    position: relative;
    padding: 5px 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
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

type RankPopUpBoxType = {
  rankPopShow: boolean;
};

const RankPopUpBox = styled.div<RankPopUpBoxType>`
  display: ${({ rankPopShow }) => (rankPopShow ? "block" : "none")};
  position: absolute;
  width: 208px;
  top: 58px;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 3px 6px;
  background-color: #fff;

  .title {
    font-size: 13px;
    margin: 7px;
    font-weight: bolder;
  }
  .query_real_time {
    display: grid;
    grid-template-columns: 2fr 5fr 3fr;
    margin: 10px;
    font-size: 14px;
    padding: 3px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .rank {
      color: red;
    }
    .count {
      color: grey;
    }
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
