import React from "react";
import styled from "styled-components";
interface ProductProps {
  item: any;
}
const Product: React.FC<ProductProps> = ({ item }) => {
  return (
    <Container>
      <ImageBox>
        {item.is_broadcasting && (
          <>
            <LiveTxt>LIVE</LiveTxt>
            <img
              className="play_btn"
              src="http://hsmoa.com/media/img/2016/timeline_dot_play.png"
              alt=""
            />
          </>
        )}

        <img src={item.image} alt="/" />
      </ImageBox>
      <ContentBox>
        <CompanyAndTimeBox>
          <img src={item.company_logo} alt="" />
          <span className="divider"> | </span>
          {item.is_broadcasting ? (
            <span className="broadcasting">현재 방송중</span>
          ) : (
            <span className="time">
              {item.time.start} ~ {item.time.end}
            </span>
          )}
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

const LiveTxt = styled.div`
  background: #f84343;
  color: #fff;
  padding: 3px 6px;
  font-size: 10px;
  border-radius: 0 0 2px 0;
  width: 32px;
  height: 18px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
`;

const ImageBox = styled.div`
  width: 130px;
  height: 100%;
  position: relative;
  img {
    display: inline-block;
    width: 130px;
    height: 100%;
  }
  .play_btn {
    z-index: 1;
    width: 40px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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

  .broadcasting {
    color: red;
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
