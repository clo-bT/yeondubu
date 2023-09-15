import React from 'react';
import wife from '../../assets/Common/wife.svg';
import styled from 'styled-components';
import { CgNametag } from 'react-icons/cg';

const Container = styled.div`
display: inline-flex;
flex-direction: column;

`
const ContentContainer = styled.div`
display: flex;
align-items: flex-start;
position: absolute;
top: 0;
left: 0;
margin: 20px;
margin-top: 30px; 
`
const WifeImg = styled.img`
width: 50px;
height: 50px;
flex-shrink: 0;
border-radius: 50px;
background: url(<이미지-경로>), lightgray 50% / cover no-repeat;
margin-top: 40px;
margin-right: 20px;
`

const BackAtag = styled.a`
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration: none;
position: absolute;
top: 0;
left: 0;
margin: 20px; 

`

const Nametag = styled.p`
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 50px;

`


const MyAccountProfile = () => {
    return (
        <Container>
            <BackAtag href="/">뒤로가기</BackAtag>
            <ContentContainer>
            <WifeImg src={wife}/>
            <Nametag>손예진님</Nametag>
            </ContentContainer>
        </Container>
    );
};

export default MyAccountProfile;