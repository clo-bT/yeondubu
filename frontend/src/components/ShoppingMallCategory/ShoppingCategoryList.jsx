import React from 'react';
import styled from 'styled-components';
import blanket from '../../assets/ShoppingMallCategory/blanket.svg';
import chair from '../../assets/ShoppingMallCategory/chair.svg';
import refrigerator from '../../assets/ShoppingMallCategory/refrigerator.svg';
import sofa from '../../assets/ShoppingMallCategory/sofa.svg';
import table from '../../assets/ShoppingMallCategory/table.svg';


const Container = styled.div`
margin-left: 10px;

`
const ShoppingContainer = styled.div`
  display: flex; 
  overflow-x: auto; 
  margin-bottom: 30px;
  margin-left: 10px
`;

const TagName = styled.div`
display: flex;
width: 51px;
height: 19px;
flex-direction: column;
justify-content: center;
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 20px;
margin-top: 10px;
`;

const ProductImg = styled.img`
width: 90px;
height: 90px;
flex-shrink: 0;
`;

const ProductName = styled.div`
display: flex;
height: 19px;
flex-direction: column;
justify-content: center;
color: #000;
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const ShoppingCategoryList = () => {
    const dummyData = [
        {
          Tagname: '가구',
          items: [
            {
              name: '소파',
              image: sofa,
            },
            {
              name: '의자',
              image: chair,
            },
            {
              name: '탁자',
              image: table,
            },
            {
              name: '이불',
              image: blanket,
            },
            {
              name: '착장',
              image: table,
            },
            {
              name: '거울',
              image: table,
            },
            {
              name: '냉장고',
              image: refrigerator,
            },
            {
              name: '화장대',
              image: table,
            },
          ],
        },
        {
          Tagname: '가전',
          items: [
            {
                name: '소파',
                image: sofa,
              },
              {
                name: '의자',
                image: chair,
              },
              {
                name: '탁자',
                image: table,
              },
              {
                name: '이불',
                image: blanket,
              },
              {
                name: '착장',
                image: table,
              },
              {
                name: '거울',
                image: table,
              },
              {
                name: '냉장고',
                image: refrigerator,
              },
              {
                name: '화장대',
                image: table,
              },
          ],
        },
        {
          Tagname: '예물',
          items: [
            {
                name: '소파',
                image: sofa,
              },
              {
                name: '의자',
                image: chair,
              },
              {
                name: '탁자',
                image: table,
              },
              {
                name: '이불',
                image: blanket,
              },
              {
                name: '착장',
                image: table,
              },
              {
                name: '거울',
                image: table,
              },
              {
                name: '냉장고',
                image: refrigerator,
              },
              {
                name: '화장대',
                image: table,
              },
          ],
        },
      ];
    return (
        <Container>
        {dummyData.map((category, index) => (
          <div key={index}>
            <TagName>{category.Tagname}</TagName>
            <ShoppingContainer>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <ProductImg src={item.image} alt={`Image ${itemIndex}`} />
                  <ProductName>{item.name}</ProductName>
                </div>
              ))}
            </ShoppingContainer>
          </div>
        ))}
      </Container>
    );
  };

export default ShoppingCategoryList;
