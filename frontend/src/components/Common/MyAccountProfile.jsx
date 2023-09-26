import React from 'react';
import styled from 'styled-components';
import wife from '../../assets/Common/wife.svg';

const Container = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
`
const GoBack = styled.a`
text-decoration: none;
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
align-items: center; 
margin: 20px;
`

const MyProfile = styled.img`
width: 57px;
height: 57px;   
`
const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-left: 10px;
  gap: 10px;
`

const MyName = styled.p`
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;    
margin: 0;
`

const MyAccount = styled.p`
color: #6E7781;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;    
margin: 0;
`
const MyAccountProfile = () => {
    return (
        <>
        <GoBack href="/" >뒤로가기</GoBack>
        <Container>
            <MyProfile src={wife}/>
            <MyInfo>
                <MyName>손예진님</MyName>
            </MyInfo>

        </Container>
        </>
 
    );
};

export default MyAccountProfile;