import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
/* justify-content: center; */
align-items: center; 
margin-top: 10px;
`

const OutButton = styled.p`
color: #000;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;  
display: inline-flex;
align-items: center;
justify-content: center;  
margin-left: 20px;
`
const Header = styled.div`  
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
const ChatBotHeader = () => {
    return (
        <Container>
            <OutButton>나가기</OutButton>
            <Header>연두부 Chatbot</Header>
        </Container>
    );
};

export default ChatBotHeader;