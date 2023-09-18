import {React, useState} from 'react';
import styled from 'styled-components';
import sofa from '../../assets/ShoppingMallCategory/sofa.svg';
import table from '../../assets/ShoppingMallCategory/table.svg';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


const Container = styled.div`                      
margin-left: 20px;
margin-bottom: 100px;

`
const LikeProduct = styled.p`
color: #000;
display: flex;
flex-direction: column;
align-items: flex-start;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;

`

const ProductImg = styled.img`
width: 90px;
height: 90px;
margin-left: 0;
width: calc(33.33% - 10px);
margin-bottom: 10px;

`

const Recommendation = styled.div`
display: flex;
flex-wrap: wrap; 
align-items: flex-start;
width: 100%; 
`
const ImgBox = styled.div`
display: flex;
align-items: flex-start; 
`
const RecommendationImg = styled.img`
  width: 100px;


`

const ImgDetail = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center; 
  margin-left: 0;
  flex-direction: column; 

`;

const Price = styled.p`
color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-left: 5px;
`

const ImgDetailRow = styled.div`
width: 100px;
display: flex;
align-items: flex-start;
justify-content: space-between;
width: 100%;
`

const HeartIcon = styled(AiOutlineHeart)`
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;
`

const FullHeartIcon = styled(AiFillHeart)`
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;    

`
const ShoppingList = () => {
    const LikedummyData = [
        { id: 1, imgSrc: sofa},
        { id: 2, imgSrc: table},


      ];

    const dummyData = [
        { id: 1, imgSrc: sofa, price: '1,550,000', liked: false },
        { id: 2, imgSrc: table, price: '2,550,000', liked: false },
        { id: 3, imgSrc: table, price: '3,550,000', liked: false },
        { id: 4, imgSrc: sofa, price: '4,550,000', liked: false },
      ];

    const [recommendedItems, setRecommendedItems] = useState(dummyData);
    
    const toggleLike = (itemId) => {
        const updatedRecommendedItems = recommendedItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, liked: !item.liked };
          }
          return item;
        });
    
        setRecommendedItems(updatedRecommendedItems);
      };
    return (
        <Container>
            <LikeProduct>내가 찜한 상품</LikeProduct>
            <ImgBox>
            {LikedummyData.map((item) => (
                <ProductImg src={item.imgSrc}/>
            ))}
            </ImgBox>

            <LikeProduct>추천 상품</LikeProduct>
      <Recommendation>
        {recommendedItems.map((item) => (
          <ImgDetail key={item.id}>

            <RecommendationImg src={item.imgSrc} />
            <ImgDetailRow>
              <Price>{item.price}</Price>
            {item.liked ? (
              <FullHeartIcon onClick={() => toggleLike(item.id)} />
            ) : (
              <HeartIcon onClick={() => toggleLike(item.id)} />
            )}
            </ImgDetailRow>
          </ImgDetail>
        ))}
      </Recommendation>

        </Container>
    );
};

export default ShoppingList;