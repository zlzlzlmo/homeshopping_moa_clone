import React from "react";
import styled from "styled-components";
interface ProductProps {
  item: any;
}
const Product: React.FC<ProductProps> = ({ item }) => {
  return (
    <Container>
      <ImageBox>
        <img src={item.image} alt="/" />
      </ImageBox>
      <ContentBox>
        <CompanyAndTimeBox>
          <img src={item.company_logo} alt="" />
          <span className="divider"> | </span>
          <span className="time">
            {item.time.start} ~ {item.time.end}
          </span>
        </CompanyAndTimeBox>
        <Title>{item.title}</Title>
        <Price>{item.price}</Price>
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
