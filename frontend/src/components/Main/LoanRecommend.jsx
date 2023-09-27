import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheckSquare, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
// import wooribank from '../../assets/Main/wooribank.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
margin-bottom: 100px;

`
const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

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


const InputButton = styled.button`
  background: #FFD0D0;
  border: none;
  cursor: pointer;
    width:140px;
    height:30px;
    border-radius: 5px;
`;

const LoanRecommend = ({ isLoanOpen, toggleLoan, LoanData }) => {
    // const dummyData = [
    //     { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11', imageSrc: wooribank },
    //     { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11',imageSrc: wooribank },
    //     { name: '우리 전세(주택금융보증)', interestrate: '4.11 ~ 5.11', imageSrc: wooribank,},
    // ];
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleGoToScoreInput = () => {
        navigate('/input');
      };
    return (
        <Container>
            <Letmeshow>
                <CheckIcon />
                {"우리 부부를 위한 대출상품을 보여드릴게요!"}
                <ToggleButton onClick={toggleLoan}>
                {isLoanOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                </ToggleButton>
            </Letmeshow>
            {isLoanOpen && (
                    <>
                        <p>정보를 입력해주시면 <br/> 맞춤형 대출 상품을 추천해드릴게요</p>
                        <InputButton onClick={handleGoToScoreInput}>정보 입력하러가기!</InputButton>
                    </>
                )
            }
        </Container>
    );
};

export default LoanRecommend;