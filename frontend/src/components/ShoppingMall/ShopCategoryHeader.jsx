import React from 'react';
import styled from 'styled-components';
import sofa from '../../assets/ShoppingMallCategory/sofa.svg';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
margin-left: 20px;
margin-right: 20px;
margin-top: 10px;

`

const Box = styled.div`
  display: flex;
  align-items: center; 
  margin-top: 10px;
  gap: 10px; 
  width: 100%;

`
const ProductInfo = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
margin-bottom: 50px;

`
const GetOutButton = styled.a`
color: #000;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration: none;

`
const ProductImg = styled.img`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 10px;
width: 130px;
height: 130px;

`

const TagName = styled.p`
color: #000;
font-size: 23px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-left: 20px;
// margin-top: -30px;
`
const Filter = styled.a`
color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration: none;
margin-left: auto;

`

const ShopCategoryHeader = () => {
    return (
        <Container>
            <GetOutButton href="/">나가기</GetOutButton>
            <Box>
            <ProductImg src={sofa}/>
            <ProductInfo>
                <TagName>이불</TagName>
                <Filter href="/">필터 설정하기</Filter>
            </ProductInfo>
         

            </Box>
        </Container>
    );
};

export default ShopCategoryHeader;