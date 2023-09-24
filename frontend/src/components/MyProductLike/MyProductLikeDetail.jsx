import React from 'react';
import styled from 'styled-components';
import blanket from '../../assets/ShoppingMallCategory/blanket.svg';
import chair from '../../assets/ShoppingMallCategory/chair.svg';
import refrigerator from '../../assets/ShoppingMallCategory/refrigerator.svg';
import sofa from '../../assets/ShoppingMallCategory/sofa.svg';
import table from '../../assets/ShoppingMallCategory/table.svg';


const Container = styled.div`

display: flex;
align-items: center;
justify-content: center;
width: 90%; 
border-radius: 10px;
background: #F5F5F5;
margin-left: auto; 
margin-right: auto; 
margin-top: 20px;
margin-bottom: 100px;
`
const Box = styled.div`
margin-top:20px;
margin-bottom: 20px;
display: grid;
grid-template-columns: repeat(3, 1fr); 
gap: 10px; 
`;


const ImageItem = styled.img`
width: 100%;
height: auto;
`;

const MyProductLikeDetail = () => {
    const dummyData = [
        {index:0, ProductImg:blanket},
        {index:1, ProductImg:chair},
        {index:2, ProductImg:refrigerator},
        {index:3, ProductImg:sofa},
        {index:4, ProductImg:table},
        {index:5, ProductImg:blanket},
        {index:6, ProductImg:chair},
        {index:7, ProductImg:refrigerator},
        {index:8, ProductImg:sofa},
        {index:9, ProductImg:table},
        {index:10, ProductImg:blanket},
        {index:11, ProductImg:chair},
        {index:12, ProductImg:refrigerator},
        {index:13, ProductImg:sofa},
        {index:14, ProductImg:table},
    ]
    return (
        <Container>

        <Box>
        {dummyData.map((item) => (
          <ImageItem key={item.index} src={item.ProductImg} alt={`Product ${item.index}`} />
        ))}
      </Box>
        </Container>
    );
};

export default MyProductLikeDetail;