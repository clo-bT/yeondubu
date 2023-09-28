import  React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    
display: flex;
flex-direction: column;
align-items: center;
// margin-top: -30px;

`
const LoanContainer = styled.div`
    
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
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
const LoanText = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 80%; 
  height: 22px;
`

const LoanDetail = styled.span`
//   display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 100%; 
//   height: 22px;
  flex-direction: column;
`

const LoanBox = styled.span`
//   display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 60%; 
//   height: 22px;
  flex-direction: column;
`

const LoanName = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 80%; 
  height: 22px;
`
const BankImg = styled.img`
width: 40px;
height: 40px;
flex-shrink: 0;
border-radius: 5px;
`

const InterestRate = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 80%; 
  height: 22px;
`

const ScoreInput = () => {
    const [salary, setSalary] = useState("");
    const [loanPeriod, setloanPeriod] = useState(""); 
    const [creditScore, setcreditScore] = useState("");
    const [totalAssets, settotalAssets] = useState("");
    // const [surCharge, setsurcharge] = useState("");
    const surCharge = 200000000
    const [NoInputError, setNoInputError] = useState(null);
    const [loanData, setLoanData] = useState([]);
    const [dataSent, setDataSent] = useState(false); // 데이터 전송 여부 상태 추가
    const [expandedItems, setExpandedItems] = useState([]);
    // const [updateLoanData, setUpdateLoanData] = useState([]);

    const navigate = useNavigate(); // useNavigate 훅 사용

    // 모아야 하는 금액 Spring에서 받아오기, 처음 랜더링될 때 한 번만 실행
    // useEffect(()=>{
    //     getMoney();
    // }, [surCharge]);

    // function getMoney(){
    //     axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/`)
    //     .then((response)=>{
    //         setsurcharge({
    //             ...surCharge,
    //             surCharge: response.data.surCharge,
    //         })
    //         console.log(response.data);
    //     })
    //     .catch((error)=>{
    //         console.log(error.message);
    //     })
    // };
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
    const addDataToLoanData = (newData) => {
        setLoanData((prevLoanData) => [...prevLoanData, newData]);
    };
    const toggleExpandedItem = (index) => {
        if (expandedItems.includes(index)) {
            // 이미 확장된 상태면 확장 상태에서 제거
            setExpandedItems(expandedItems.filter((item) => item !== index));
        } else {
            // 확장되지 않은 상태면 확장 상태로 추가
            setExpandedItems([...expandedItems, index]);
        }
    };
    const sendDataToServer = () => {
        // 데이터를 서버로 보내기 위한 POST 요청을 작성합니다.
        console.log('flask로 데이터 보내기')
        console.log(salary);
        console.log(loanPeriod);
        console.log(creditScore);
        console.log(totalAssets);
        console.log(surCharge);
        if (!salary || !loanPeriod || !creditScore || !totalAssets) {
            setNoInputError('모든 정보를 입력해주세요');
            return; // 정보가 누락된 경우 함수 종료
          }
        axios.post('http://localhost:5000/api/loanupload', {
                salary: salary,
                loanPeriod: loanPeriod,
                creditScore: creditScore,
                totalAssets: totalAssets,
                surCharge: surCharge,
            }, { 
            headers: {
                'Content-Type': 'application/json', // JSON 데이터를 보내고 있다면 헤더 설정
            },
        
        })
        .then((response) => {
            // 서버 응답 처리
            console.log('데이터 전송 완료:', response.data);
            const Data = response.data.result;
            // {Data.map((data, key) => {
            //     return <h1 key={key}>{data.fin_company}</h1>;
            // })}
            console.log(Data);
            addDataToLoanData(Data);
            // navigate('/');
            setDataSent(true); // 데이터 전송 완료 후 상태 업데이트
        })
        .catch((error) => {
            // 오류 처리
            // navigate('/');
            console.error('데이터 전송 중 오류 발생:', error);
        });
    };
    return (
        <Container>
            <h2>나한테 딱 맞는 대출상품</h2>
            {dataSent ? (
                <>
                    {loanData && (
                        <LoanBox>
                        {loanData[0].map((data, index) => (
                            <LoanContainer key={index}>
                                {/* <BankImg src={data.imageSrc} alt={`Image ${index}`} /> */}
                                <LoanText>
                                    <BankImg src={require(`../../assets/logo/${data.fin_company}.png`)} alt={`Image ${index}`} />
                                    <LoanName onClick={() => toggleExpandedItem(index)}>{data.fin_company} {data.loans_name}</LoanName>
                                </LoanText>
                                {expandedItems.includes(index) && (
                                    <LoanDetail>
                                        <h5>신용 점수 기준 이율</h5>
                                        <div>{data.rate}%</div>
                                        <h5>이 상품을 이용할 시</h5>
                                        <div>총 상환 금액 : {data.total_repay}(원)</div>
                                        <div>대출 총 이자 : {data.interest}(원)</div>
                                        <div>달 상환 금액 : {data.month_repay}(원)</div>
                                        <h5>DSR 기준 별 대출 한도에요</h5>
                                        <div>40% : {data.limit_amount[0]}(원)</div>
                                        <div>70% : {data.limit_amount[1]}(원)</div>
                                        <div>90% : {data.limit_amount[2]}(원)</div>
                                        <h5>수입 구간이 같은 사람들과 비교해드릴게요</h5>
                                        <div>고객님의 자산 대비 부채 비율 : {data.my_total_ratio}%</div>
                                        <div>{data.comment}</div>
                                        <br /><hr />
                                    </LoanDetail>
                                )}
                            </LoanContainer>
                        ))}
                        </LoanBox>
                    )}
                </>
            ) : (
                <>
            {NoInputError && <p style={{ color: 'red' }}>{NoInputError}</p>}
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
            </>
            )}

            <Info>개인 정보는 교육 목적으로 사용할 것으로 <br />저장, 다른 목적으로 사용하지 않습니다.</Info>
        </Container>
    );
};

export default ScoreInput;