import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
overflow-y: auto;
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
margin-bottom: 110px;
height: auto;
`

const Recommendation = styled.div`
display: flex;
flex-wrap: wrap; 
align-items: flex-start;
width: 100%; 
`

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


const RecommendationFilter = () => {
    const accessToken = localStorage.getItem("token");
    const {category, subcategory} = useParams();
    const [items, setItems] = useState([]);
    const [likedArray, setLikedArray] = useState([]);
    const [likedIdxs, setLikedIdxs] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    useEffect(() => {
        const getItem = localStorage.getItem('img_search');
        setItems(JSON.parse(getItem))
    }, []);

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
            axios.get(`http://j9a307.p.ssafy.io:5000/api/v1/marriage-stuffs/liked_items`, {params})
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

    console.log(items);
    return (
      <Container>
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

export default RecommendationFilter;