import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Recommendation = styled.div`
display: flex;
flex-wrap: wrap; 
align-items: flex-start;
width: 100%; 
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
const RecommendationFilter = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const getItem = localStorage.getItem('img_search');
        setItems(JSON.parse(getItem))
    }, []);
    console.log(items);
    return (
        <Recommendation>
            {items.map((item, index) => (
              <ImgDetail key={index}>
                <RecommendationImg src={item.image} />
                <ImgDetailRow>
                  <Price>{item.lprice}</Price>
                </ImgDetailRow>
              </ImgDetail>
            ))}
        </Recommendation>
    );
};

export default RecommendationFilter;