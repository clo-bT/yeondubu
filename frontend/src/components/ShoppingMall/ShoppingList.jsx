import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`                      
margin-left: 20px;
margin-right: 20px;
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

// const ProductImg = styled.img`
// width: 90px;
// height: 90px;
// margin-left: 0;
// width: calc(33.33% - 10px);
// margin-bottom: 10px;

// `

const Recommendation = styled.div`
display: flex;
flex-wrap: wrap; 
align-items: flex-start;
width: 100%; 
`

// const ImgBox = styled.div`
// display: flex;
// align-items: flex-start; 
// `

const RecommendationImg = styled.img`
width: 100px;
height: 100px; /* Set a fixed height of 100px */
object-fit: cover; /* Crop the image if it exceeds the container */
`

const ImgDetail = styled.div`
  width:31%;
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

const LikedContainer = styled.div`
display: flex; 
overflow-x: auto; 
margin-bottom: 30px;
margin-left: 10px;
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

const Band = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`

const SmallHeader = styled.p`
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-top : 5px;
margin-bottom: 5px;
`

const ShoppingList = () => {
    const accessToken = localStorage.getItem("token");
    const {category, subcategory} = useParams();
    const [filterData, setFilterData] = useState([]);
    
    const [likedArray, setLikedArray] = useState([]);
    const [likedIdxs, setLikedIdxs] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const [items, setItems] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      const defaultData = {
        lprice : 0,
        hprice : 1000000000,
        brand : ''
      };
      let storedData = JSON.parse(localStorage.getItem(subcategory));
      console.log(storedData);
      if (!storedData) {
        localStorage.setItem(subcategory, JSON.stringify(defaultData));
        storedData = defaultData;
      };
      setFilterData(storedData);
    }, [subcategory]);  

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/marriage-stuffs/likes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((res) => {
            let rawData = res.data;
            let likedItemArray = rawData.filter((item) => item.category === category && item.subcategory === subcategory);
            setLikedArray(likedItemArray);
            let likeIndex = likedArray.map(item => item.item_id);
            setLikedIdxs(likeIndex);
            const ArrayToString = likeIndex.join(', ');
            const params = {
                category : category,
                subcategory : subcategory,
                likes : ArrayToString
            };
            axios.get(`${process.env.REACT_APP_FLASK_ROOT}/apii/v1/marriage-stuffs/liked_items`, {params})
            .then((response) => {
                setLikedItems(response.data);
                setTriggerUpdate(false);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }, [category, subcategory, accessToken, triggerUpdate]);

    useEffect(() => {
        const params = {
            category : category,
            subcategory : subcategory,
            lprice : filterData.lprice,
            hprice : filterData.hprice,
            brand  : filterData.brand,
            page   : currentPage
        };
        axios.get(`${process.env.REACT_APP_FLASK_ROOT}/apii/v1/marriage-stuffs/catalogue`, {params})
        .then ((response) => {
            setItems(response.data.products);
            setCurrentPage(1);
        })
        .catch ((error) => {
            console.error('Error fetching default values:', error);
        });
    }, [category, subcategory, filterData]);

    const likeItem = (itemID) => {
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/marriage-stuffs/${category}/${subcategory}/${itemID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((res) => {
            setTriggerUpdate(true);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    };
      
    const unlikeItem = (itemID) => {
        const like = likedArray.find((item) => item.item_id === itemID);
        axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/marriage-stuff/likes/${like.likes_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((res) => {
            setTriggerUpdate(true);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <Container>
            <LikeProduct>내가 찜한 상품</LikeProduct>
              <LikedContainer>
                {likedItems.map((item, index) => (
                    <ImgDetail key={index}>
                      <RecommendationImg src={item.image} href={item.link} />
                      <ImgDetailRow>
                        <Price>{item.lprice}</Price>
                        {likedIdxs.includes(item.item_id) ? (
                          <FullHeartIcon onClick = {() => unlikeItem(item.item_id)} />
                        ) : (
                          <HeartIcon onClick={() => likeItem(item.item_id)} />
                        )}
                      </ImgDetailRow>
                    </ImgDetail>
                ))}
              </LikedContainer>
          <Band>
            <SmallHeader>추천 상품</SmallHeader>
            <Link to = {`/shoppingfilter/${category}/${subcategory}`} >
                <Filter>필터 설정하기</Filter>
            </Link>
          </Band>
            <Recommendation>
                {items.map((item, index) => (
                  <ImgDetail key={index}>
                    <a href={item.link}>
                      <RecommendationImg src={item.image} />
                    </a>
                    <ImgDetailRow>
                      <Price>{item.lprice}</Price>
                      {likedIdxs.includes(item.item_id) ? (
                        <FullHeartIcon onClick = {() => unlikeItem(item.item_id)} />
                      ) : (
                        <HeartIcon onClick={() => likeItem(item.item_id)} />
                      )}
                    </ImgDetailRow>
                  </ImgDetail>
                ))}
            </Recommendation>
      </Container>
    );
};

export default ShoppingList;