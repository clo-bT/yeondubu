import  React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
    
display: flex;
flex-direction: column;
align-items: center;

`
const ScoreInputBox = styled.input`
width: 150px;
height: 35px;
border: none; 
border-bottom: 1px solid rgba(0, 0, 0, 0.20); 
background: #FFF;
`

const Info = styled.p`
color: #FF6565;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
position: fixed; 
bottom: 0;
left: 0; 
right: 0; 
padding: 10px; 
`

const InputButton = styled.button`
display: inline-flex;
width: 120px;
height: 44px;
padding: 10px 30px;
justify-content: center;
align-items: center;
color: #FF5A5A;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
border: none;
border-radius: 10px;
margin-top: 20px;
`

const Box = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 80%; 
  height: 22px;

 
`
const InfoHeader = styled.p`
color: #000;
text-align: center;
font-family: Inter;
font-size: 13px;
font-style: normal;
font-weight: 500;
line-height: normal;    

`
const ScoreInput = () => {
    const [salary, setSalary] = useState("");
    const [loanPeriod, setloanPeriod] = useState(""); 
    const [creditScore, setcreditScore] = useState("");
    const [totalAssets, settotalAssets] = useState("");
    const [surCharge, setsurcharge] = useState("");

    // 모아야 하는 금액 Spring에서 받아오기, 처음 랜더링될 때 한 번만 실행
    useEffect(()=>{
        getMoney();
    }, [surCharge]);

    function getMoney(){
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/`)
        .then((response)=>{
            setsurcharge({
                ...surCharge,
                surCharge: response.data.surCharge,
            })
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    };
    const onChangeSalary = (e) => {
        setSalary({
            ...salary,
            salary: e.target.value,
        });
    };
    const onChangeloanPeriod = (e) => {
        setloanPeriod({
            ...loanPeriod,
            loanPeriod: e.target.value,
        });
    };
    const onChangecreditScore = (e) => {
        setcreditScore({
            ...creditScore,
            creditScore: e.target.value,
        });
    };
    const onChangetotalAssets = (e) => {
        settotalAssets({
            ...totalAssets,
            totalAssets: e.target.value,
        });
    };
    const sendDataToServer = () => {
        // 데이터를 서버로 보내기 위한 POST 요청을 작성합니다.
        console.log('flask로 데이터 보내기')
        console.log(salary);
        console.log(loanPeriod);
        console.log(creditScore);
        console.log(totalAssets);
        console.log(surCharge);
        axios.post('http://localhost:5000/api/loanupload', {
            salary: salary,
            loanPeriod: loanPeriod,
            creditScore: creditScore,
            totalAssets: totalAssets,
            surCharge: surCharge,
        })
        .then((response) => {
            // 서버 응답 처리
            console.log('데이터 전송 완료:', response.data);
        })
        .catch((error) => {
            // 오류 처리
            console.error('데이터 전송 중 오류 발생:', error);
        });
    };
    return (
        <Container>
            <Box>
            <InfoHeader>예비 부부 합산 월소득</InfoHeader>
            <ScoreInputBox
            id = 'salary'
            name = 'salary' 
            type="text"
            onChange={onChangeSalary}
            />

            </Box>

            <Box>
            <InfoHeader>대출 받으실 기간(년)</InfoHeader>
            <ScoreInputBox
            id = 'loanPeriod'
            name = 'loanPeriod' 
            type="text"
            onChange={onChangeloanPeriod}
            />   
            </Box>

            <Box>
            <InfoHeader>나의 신용점수</InfoHeader>
            <ScoreInputBox 
            id = 'creditScore'
            name = 'creditScore'
            type="text"
            onChange={onChangecreditScore}
            />   
            </Box>

            <Box>
            <InfoHeader>나의 총 자산</InfoHeader>
            <ScoreInputBox
            id = 'totalAssets'
            name = 'totalAssets'
            type="text"
            onChange={onChangetotalAssets}
            />    
            </Box>

            <InputButton onClick={sendDataToServer}>입력하기</InputButton>


            <Info>개인 정보는 교육 목적으로 사용할 것으로 <br />저장, 다른 목적으로 사용하지 않습니다.</Info>
        </Container>
    );
};

export default ScoreInput;