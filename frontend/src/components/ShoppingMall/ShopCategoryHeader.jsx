import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link , useParams} from 'react-router-dom';
import axios from 'axios';


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
    const {category, subcategory} = useParams();
    const [headerTitle, setHeaderTitle] = useState(null);
    useEffect(() => {
        const baseURL = `${process.env.REACT_APP_FLASK_ROOT}`
        const URL = '/api/v1/marriage-stuffs/category'
        const params = {
            category: category,
            subcategory: subcategory
        };
        axios.get(baseURL + URL, {params})
        .then((response) => {
            setHeaderTitle(response.data.category);
        })
        .catch((error) => {
            console.error('Error fetching default values:', error);
        })
    }, [category, subcategory]);
    return (
        <Container>
            <Link to = {'/shoppingmallcategory'}>
                <GetOutButton>나가기</GetOutButton>
            </Link>
            <Box>
            <ProductInfo>
                <TagName>{headerTitle}</TagName>
                <Link to = {`/shoppingfilter/${category}/${subcategory}`} >
                    <Filter>필터 설정하기</Filter>
                </Link>
            </ProductInfo>
            </Box>
        </Container>
    );
};

export default ShopCategoryHeader;