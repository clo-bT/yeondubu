import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const baseURL = 'http://localhost:5000'
        const URL = '/api/v1/marriage-stuffs/categories'
        axios.get(baseURL + URL)
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.error('Error fetching default values:', error);
        })
    }, []);

    return (
        <Container>
        {categories.map((category, index) => (
          <div key={index}>
            <TagName>{category.tagname}</TagName>
            <ShoppingContainer>
              {category.items.map((subcategory, itemIndex) => (
                <Link to={`/shoppingmall/${category.tag}/${subcategory.tag}`}>
                  <div key={itemIndex}>
                    <ProductImg src={subcategory.imgURL} alt={`Image ${itemIndex}`} />
                    <ProductName>{subcategory.tagname}</ProductName>
                  </div>
                </Link>
              ))}
            </ShoppingContainer>
          </div>
        ))}
      </Container>
    );
  };

export default ShoppingCategoryList;
