import React from "react";
import styled from "styled-components";
const Product = () => {
  return (
    <Container>
      <ImageBox>
        <img
          src="http://thum.buzzni.com/unsafe/320x320/center/smart/http://cdn.image.buzzni.com/2021/04/18/pp04Qt5cEk.jpg"
          alt="/"
        />
      </ImageBox>
      <ContentBox>
        <CompanyAndTimeBox>
          <img
            src="http://cache.m.ui.hsmoa.com/media/hsmoa/logo/logo_gsshop.png"
            alt=""
          />
          <span className="divider"> | </span>
          <span className="time">0시 00분 ~ 1시 00분</span>
        </CompanyAndTimeBox>
        <Title>이다희 스키니랩 행복한 시서스 다이어트 8주+8주, 16주분</Title>
        <Price>49,900원</Price>
      </ContentBox>
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  height: 130px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ImageBox = styled.div`
  width: 130px;
  height: 100%;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  padding-left: 14px;
`;

const CompanyAndTimeBox = styled.div`
  font-size: 12px;
  color: #999;
  img {
    width: 52px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .divider {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const Title = styled.div`
  line-height: 1.25em;
  max-height: 2.4em;
  font-size: 15px;
  margin-top: 10px;
`;

const Price = styled.div`
  color: #111;
  font-size: 17px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  height: 100%;
`;
export default Product;
