import React from "react";
import styled from "styled-components";
const NoProduct = () => {
  return (
    <Container>
      <img src="http://hsmoa.com/media/img/2016/icon_visit.png" alt="" />
      <br />
      조건에 맞는 편성표가 없습니다
      <br />
      조건을 바꿔 다시 시도해주세요.
    </Container>
  );
};

const Container = styled.div`
  padding: 70px 0px;
  line-height: 24px;
  display: block;
  font-size: 15px;
  margin-right: 50px;
  color: #888;
  width: 70%;
  text-align: center;
  img {
    width: 80px;
    margin: 10px;
  }
`;

export default NoProduct;
