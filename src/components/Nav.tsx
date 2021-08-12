import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
const Nav = () => {
  return (
    <NavContainer>
      <Logo />
      <SearchBox>
        <SearchInput />
        <SearchIcon />
      </SearchBox>
      <SearchRankContainer>
        <SearchRankWrapper>
          <SearchRank>
            <span className="rank">1.</span>
            <span className="word">김치</span>
            <span className="count">14 hits</span>
          </SearchRank>
          <SearchRank>
            <span className="rank">2.</span>
            <span className="word">김치2</span>
            <span className="count">14 hits</span>
          </SearchRank>
          <SearchRank>
            <span className="rank">1.</span>
            <span className="word">김치</span>
            <span className="count">14 hits</span>
          </SearchRank>
          <SearchRank>
            <span className="rank">1.</span>
            <span className="word">김치</span>
            <span className="count">14 hits</span>
          </SearchRank>
          <SearchRank>
            <span className="rank">1.</span>
            <span className="word">김치</span>
            <span className="count">14 hits</span>
          </SearchRank>
        </SearchRankWrapper>
      </SearchRankContainer>
      <Ad>
        <img src="http://hsmoa.com/media/img/web/ad_button.png" alt="" />
      </Ad>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 71px;
  min-width: 900px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Logo = styled.h1`
  background-image: url("http://hsmoa.com/media/img/web/logo_hsmoa.png");
  width: 150px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const SearchBox = styled.div`
  border: 2px solid #ea1d27;
  width: auto;
  height: 40px;
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
  width: 25px;
  height: 25px;
  display: inline-block;
  background-size: contain;
  vertical-align: middle;
  margin: 0 10px;
`;

const SearchRankContainer = styled.div`
  width: 228px;
  height: 71px;
  position: relative;
  overflow: hidden;
`;

const SearchRankWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SearchRank = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 5fr 2fr;
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;
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
  }
  .count {
    color: gray;
  }
`;

const Ad = styled.div`
  img {
    display: inline-block;
    width: 196px;
    height: 48px;
    border-radius: 4px;
  }
`;
export default Nav;
