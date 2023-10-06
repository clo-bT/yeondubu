import React from 'react';
import styled from 'styled-components';
import { AiOutlineHome } from "react-icons/ai";
import { LiaWalletSolid } from "react-icons/lia";
import { BsCalendarHeart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";


const Container = styled.div`
display: flex;
justify-content: space-around;
position: fixed;
bottom: 0;
left: 0;
right: 0;
background-color: white;
z-index: 999;
`;

const HomeIcon = styled(AiOutlineHome)`
width: 35px;
height: 34px;
color : #000;
`
const WalletIcon = styled(LiaWalletSolid)`
width: 35px;
height: 35px;
color : #000;
`
const CalenderIcon = styled(BsCalendarHeart)`
width: 30px;
height: 33px;
color : #000;
`
const ProfileIcon = styled(CgProfile)`
width: 35px;
height: 34px;
color : #000;
`
const AllIcon = styled(AiOutlineMenu)`
width: 35px;
height: 34px;
color : #000;
`

const IconDetail = styled.p`
color: #3A3A3A;
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 1px;
`
const Menubar = () => {
    return (
    <Container>
        <div>
        <a href="/"><HomeIcon /></a>
        <IconDetail>홈</IconDetail>
        </div>

        <div>
        <a href="/checkbox"><WalletIcon /></a>
        <IconDetail>예산</IconDetail>
        </div>

        <div>
        <a href="/calendar"><CalenderIcon/></a>
        <IconDetail>달력</IconDetail>
        </div>

        <div>
        <a href="/mypage"><ProfileIcon/></a>
        <IconDetail>MY</IconDetail>
        </div>

        <div>
        <a href="/wholetab"><AllIcon/></a>
        <IconDetail>전체</IconDetail>
        </div>
    </Container>
    );
};

export default Menubar;