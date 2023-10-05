import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import axios from 'axios';


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
  const {category, subcategory} = useParams();
  const [filterData, setFilterData] = useState([]);
  
  const [likedItems, setLikedItems] = useState([]);
  const [items, setItems] = useState([]);
  
  const [offset, setOffset] = useState(0);
  const [target, setTarget] = useState(null);
  const [stop, setStop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);


    useEffect(() => {
      const defaultData = {
        category : category,
        subcategory : subcategory,
        lprice : 0,
        hprice : 1000000000,
        brand : ''
      };
      var storedData = localStorage.getItem('filterData');
      if (!storedData) {
        localStorage.setItem('filterData', JSON.stringify([defaultData, ]));
        storedData = [defaultData, ];
      };
      const parsedData = JSON.parse(storedData);
      const categoryFilter = parsedData.filter(item => item.category === category && item.subcategory === subcategory);
      if (categoryFilter) {
        // console.log(categoryFilter);
        setFilterData(categoryFilter);
      } else {
        storedData = [...storedData, defaultData];
        localStorage.setItem('filterData', JSON.stringify(storedData));
        setFilterData(defaultData);
      };
    }, [category, subcategory]); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        const baseURL = 'http://localhost:5000'
        const itemDetailURL = '/api/v1/marriage-stuffs/liked_items'
        const likeIndex = [3, 1, 15, 2];
        const ArrayToString = likeIndex.join(', ');
        const params = {
            category : category,
            subcategory : subcategory,
            likes : ArrayToString
        };
        axios.get(baseURL + itemDetailURL, {params})
        .then((response) => {
          console.log(response.data);
          setLikedItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }, [category, subcategory]);

    useEffect(() => {
        const baseURL = 'http://localhost:5000'
        const URL = '/api/v1/marriage-stuffs/catalogue'
        const params = {
            category : category,
            subcategory : subcategory,
            lprice : filterData.lprice,
            hprice : filterData.hprice,
            brand  : filterData.brand,
            page   : currentPage
        };
        axios.get(baseURL + URL, {params})
        .then ((response) => {
            setItems(response.data.products);
            console.log(items);
            setCurrentPage(currentPage+1);
        })
        .catch ((error) => {
            console.error('Error fetching default values:', error);
        });
    }, [category, subcategory, filterData, items, currentPage]);

    

    // const toggleLike = (itemId) => {
    //     const updatedRecommendedItems = recommendedItems.map((item) => {
    //       if (item.id === itemId) {
    //         return { ...item, liked: !item.liked };
    //       }
    //       return item;
    //     });
    //     setRecommendedItems(updatedRecommendedItems);
    //   };

    useEffect(() => {
      let observer;
      if (target && !stop) {
        observer = new IntersectionObserver(onIntersect, {
          threshold: 1,
        });
        observer.observe(target);
      }
      return () => observer && observer.disconnect();
    }, [target, isLoaded]);
  
  
    // const fetchMoreData = () => {
    //   const baseURL = 'http://localhost:5000'
    //   const URL = '/api/v1/marriage-stuffs/catalogue'
    //   const params = {
    //     category : category,
    //     subcategory : subcategory,
    //     lprice : filterData.lprice,
    //     hprice : filterData.hprice,
    //     brand  : filterData.brand,
    //     page   : currentPage
    //   };
    //   axios.get(baseURL + URL, {params})
    //   .then ((response) => {
    //     if (response.data.length === 0) {
    //       setHasMoreData(false); // No more data to load
    //     } else {
    //         const newData = response.data;
    //         setItems([...items, ...newData]);
    //         setCurrentPage(currentPage+1);
    //       };
    //   })
    //   .catch ((error) => {
    //       console.error('Error fetching default values:', error);
    //   });
    // };

    useEffect(() => {
      if (isLoaded && !stop) {
        const baseURL = 'http://localhost:5000'
        const URL = '/api/v1/marriage-stuffs/catalogue'
        const params = {
          category : category,
          subcategory : subcategory,
          lprice : filterData.lprice,
          hprice : filterData.hprice,
          brand  : filterData.brand,
          page   : currentPage
        };
        axios.get(baseURL + URL, {params})
          .then ((res) => {
            setItems((items) => items.concat(res.data));
            setOffset((offset) => offset + res.data.length);
            setIsLoaded(false);
            if (res.data.length < 40) {
              // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
              setStop(true);
            }
          });
      }
    }, [isLoaded]);
  
    const getMoreItem = () => {
      setIsLoaded(true);
    };
  
    const onIntersect = async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreItem();
        observer.observe(entry.target);
      }
    };


    return (
        <Container>
            <LikeProduct>내가 찜한 상품</LikeProduct>
              <ImgBox>
                {likedItems.map((item) => (
                    // <ProductImg src={item.image} href={item.link}/>
                    // <ImgDetailRow>
                    //   <Price>{item.price}</Price>
                    //   {item.liked ? (
                    //     <FullHeartIcon onClick={() => toggleLike(item.id)} />
                    //   ) : (
                    //     <HeartIcon onClick={() => toggleLike(item.id)} />
                    //   )}
                    // </ImgDetailRow>
                    <ImgDetail key={item.id}>
                      <RecommendationImg src={item.image} href={item.link} />
                      <ImgDetailRow>
                        <Price>{item.lprice}</Price>
                        {/* {item.liked ? (
                          <FullHeartIcon onClick={() => toggleLike(item.id)} />
                        ) : (
                          <HeartIcon onClick={() => toggleLike(item.id)} />
                        )} */}
                      </ImgDetailRow>
                    </ImgDetail>
                ))}
              </ImgBox>
          <LikeProduct>추천 상품</LikeProduct>
            <Recommendation>
              {items.map((item, index) => (
                <ImgDetail key={index}>
                  <RecommendationImg src={item.image} />
                  <ImgDetailRow>
                    <Price>{item.lprice}</Price>
                    {/* {item.id ? (
                      <FullHeartIcon onClick={() => toggleLike(item.id)} />
                      ) : (
                        <HeartIcon onClick={() => toggleLike(item.id)} />
                        )} */}

                  </ImgDetailRow>
                </ImgDetail>
              ))}
              <h4 ref={setTarget}>...Loading</h4>
            </Recommendation>
      </Container>
    );
};

export default ShoppingList;