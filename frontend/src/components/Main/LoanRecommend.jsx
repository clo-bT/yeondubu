import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheckSquare } from "react-icons/ai";
import wooribank from '../../assets/Main/wooribank.svg';

const Container = styled.div`
margin-bottom: 100px;


`
const LoanContainer = styled.div`
display: flex;
align-items: center;
border-radius: 5px;
background: #EDEEF1;
padding: 10px;
margin: 10px 30px;
height: 62px;
flex-shrink: 0;

`
const CheckIcon = styled(AiOutlineCheckSquare)`
width: 20px;
height: 20px;
flex-shrink: 0;
color: #FF5959;
margin-right: 7px;
`

const Letmeshow = styled.p`
color: #000;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-align: left;
margin-left: 30px;
margin-bottom: 20px;
`
const BankImg = styled.img`
// width: 40px;
// height: 40px;
flex-shrink: 0;
border-radius: 5px;
`

const LoanName = styled.p`
color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;

`
const InterestRate = styled.p`
color: #000;
text-align: center;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const LoanText = styled.div`
display: inline-flex;
flex-direction: column;
margin-left: 30px;
align-items: flex-start;
`;


const LoanRecommend = () => {
    const dummyData = [
        { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11', imageSrc: wooribank },
        { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11',imageSrc: wooribank },
        { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11', imageSrc: wooribank,},
        
      ];
    return (
        <Container>
            <Letmeshow><CheckIcon />우리 부부를 위한 대출상품 보여드릴게요!</Letmeshow>
                {dummyData.map((data, index) => (
                <LoanContainer key={index}>
                    <BankImg src={data.imageSrc} alt={`Image ${index}`} />
                    <LoanText>
                    <LoanName>{data.name}</LoanName>
                    <InterestRate>대출금리 : {data.interestrate}</InterestRate>
                    </LoanText>
                </LoanContainer>
                ))}

        </Container>
    );
};

export default LoanRecommend;