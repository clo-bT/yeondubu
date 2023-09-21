import React from 'react';
import { BsBox } from 'react-icons/bs';
import styled from 'styled-components';


const Container = styled.div`
display: flex;
/* justify-content: center; */
align-items: center; 
margin-top: 20px;


`
const GetOutButton = styled.a`
color: #000;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;   
text-decoration: none;
margin-left: 20px;
`

const Monni = styled.p`
color: #000;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;  
display: flex;
justify-content: center;
position: absolute;
left: 50%;
transform: translateX(-50%);
`
const MonniHeader = () => {
    return (
        <Container>
            <GetOutButton href=''>나가기</GetOutButton>
            <Monni>문의하기</Monni>
      </Container>
    );
};

export default MonniHeader;