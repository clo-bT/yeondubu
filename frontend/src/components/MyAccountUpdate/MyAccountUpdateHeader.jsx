import React from 'react';
import styled from 'styled-components';

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
border-radius: 50%;

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
const MyAccountUpdateHeader = () => {
  const name = localStorage.getItem('name')
  const image = localStorage.getItem('image')
    return (
        <>
        <GoBack href="/myaccountdetail/:accountId" >뒤로가기</GoBack>
        <Container>
            <MyProfile src={image}/>
            <MyInfo>
                <MyName>{name}님</MyName>
                <MyAccount>{name}님의 계좌를 수정해주세요.</MyAccount>
            </MyInfo>

        </Container>
        </>
 
    );
};

export default MyAccountUpdateHeader;