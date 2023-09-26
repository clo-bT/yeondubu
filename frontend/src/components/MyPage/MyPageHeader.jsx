import React from 'react';
import styled from 'styled-components';
import wife from '../../assets/Common/wife.svg';


const Container = styled.div`
margin-top: 30px;
`

const MyProfile = styled.img`
width: 130px;
height: 130px;
border-radius: 146.483px;

`
const Hi = styled.p`
color: #6E7781;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    
margin-bottom: 0px;

`
const MyPageHeader = () => {
    return (
        <>
        
        <Container>
            <MyProfile src={wife}/>
            <Hi>손예진님, 안녕하세요!</Hi>
        </Container>
        </>
    );
};

export default MyPageHeader;