import {React, useState} from 'react';
import wife from '../../assets/Common/wife.svg';
import husband from '../../assets/Common/husband.svg';
import heart from '../../assets/Common/heart.svg';
import styled from 'styled-components';

const CoupleContainer = styled.div`
    margin-top: 100px;
    height: 182px;
    flex-shrink: 0;
`


const WifeImg = styled.img`
width: 139.232px;
height: 146.483px;
flex-shrink: 0;
border-radius: 146.483px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const Husband = styled.img`
width: 139.232px;
height: 146.483px;
flex-shrink: 0;
border-radius: 146.483px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`


const InputButton = styled.button`
color: #FF5A5A;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding : 10px 20px;
border: none;
margin-top : 60px;
border-radius: 10px;
`

const HeartImg = styled.img`
width: 41px;
height: 37px;
flex-shrink: 0;
margin-bottom: 50px;
margin-left:10px;
margin-right:10px;
`



const CoupleImage = () => {

    return (
        <CoupleContainer>
            <WifeImg src={wife} />
            <HeartImg src={heart} />
            <Husband src={husband} />
        </CoupleContainer>
    );
};

export default CoupleImage;