import  React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    
display: flex;
flex-direction: column;
align-items: center;
// margin-top: -30px;
padding-top: 25%;
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
position: absolute; 
top: 30px;
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
  width: 100%; 
  height: 22px;
`

const LoanDetail = styled.span`

`

const LoanBox = styled.span`
//   display: flex;
  align-items: center; 
//   justify-content: space-between;
  width: 80%; 
//   height: 22px;
  flex-direction: column;
  margin-bottom: 80px;
`

const LoanName = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 100%; 
  height: 22px;
`
const BankImg = styled.img`
width: 35px;
height: 35px;
flex-shrink: 0;
border-radius: 5px;
margin:0px;
`

const LoanTableRow = styled.tr`
  background-color: ${(props) => (props.isEven ? '#ffffff' : '#f2f2f2')};
`;

const LoanTableTitle = styled.th`
  border: 1px solid #ddd;
  padding: 6px;
  text-align: left;
`;
const LoanTableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 6px;
  text-align: left;
  font-size: 10px;
`;
const LoanTableBody = styled.th`
  border: 1px solid #ddd;
  padding: 6px;
  text-align: center;
`;


const ScoreInput = () => {
    const [salary, setSalary] = useState("");
    const [loanPeriod, setloanPeriod] = useState(""); 
    const [creditScore, setcreditScore] = useState("");
    const [totalAssets, settotalAssets] = useState("");
    const [surCharge, setsurcharge] = useState("");
    // const surCharge = 200000000
    const [NoInputError, setNoInputError] = useState(null);
    const [loanData, setLoanData] = useState([]);
    const [dataSent, setDataSent] = useState(false); // 데이터 전송 여부 상태 추가
    const [expandedItems, setExpandedItems] = useState([]);

  // const navigate = useNavigate();
  // useNavigate 훅 사용

    const [accessToken, setAccessToken] = useState('');
    const [estimatedMoney, setEstimatedMoney] = useState(0); // 예상 금액 상태 추가
    const [cashMoney, setCashMoney] = useState(0); // 예상 금액 상태 추가
    const [accountMoney, setAccountMoney] = useState(0);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }, []);

    useEffect(() => {
      if (accessToken) {
        axios
          .get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/total-expect`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log('요청 성공:', response.data);
            const estimatedMoneyValue = response.data.total_expect_expenditure; 
            setEstimatedMoney(estimatedMoneyValue); // 상태를 업데이트
          })
          .catch((error) => {
            console.error('요청 실패:', error);
          });
      }
    }, [accessToken]);

    useEffect(() => {
        if (accessToken) {
          axios
            .get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/total-cash`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log('요청 성공:', response.data);
              const estimatedMoneyValue = response.data;
              setCashMoney(estimatedMoneyValue); // 상태를 업데이트
            })
            .catch((error) => {
              console.error('요청 실패:', error);
            });
        }
      }, [accessToken]);
    
      useEffect(() => {
        if (accessToken) {
          axios
            .get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/total-account`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log('요청 성공:', response.data);
              const estimatedMoneyValue = response.data; 
              setAccountMoney(estimatedMoneyValue); // 상태를 업데이트
            })
            .catch((error) => {
              console.error('요청 실패:', error);
            });
        }
      }, [accessToken]);

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
    function addcommatonumber(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    };
    const sendDataToServer = () => {
        const usemoney = estimatedMoney - (cashMoney.bride_total_cash+cashMoney.groom_total_cash
            +accountMoney.bride_total_account +accountMoney.groom_total_account);
        setsurcharge(usemoney)
        console.log(surCharge)
        console.log(salary)
        if (!salary || !loanPeriod || !creditScore || !totalAssets) {
            setNoInputError('모든 정보를 입력해주세요');
            return; // 정보가 누락된 경우 함수 종료
          }
        axios.post(process.env.REACT_APP_FLASK_ROOT + '/api/v1/loanupload', {
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
            console.log(Data);
            addDataToLoanData(Data);
            setDataSent(true); // 데이터 전송 완료 후 상태 업데이트
        })
        .catch((error) => {
            console.error('데이터 전송 중 오류 발생:', error);
        });
    };
    return (
        <Container>
            <h2>나한테 딱 맞는 대출상품</h2>
            <Info>개인 정보는 교육 목적으로 사용할 것으로 <br />저장, 다른 목적으로 사용하지 않습니다.</Info>
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
                                        <table>
                                            <tbody>
                                                <LoanTableRow isEven={index % 2 === 1}>
                                                    <LoanTableTitle colSpan="2">신용 점수 기준 이율</LoanTableTitle>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableBody colSpan="2">{data.rate}%</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 1}>
                                                    <LoanTableTitle colSpan="2">고객님의 자산 대비 부채 비율</LoanTableTitle>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableBody colSpan="2">{data.my_total_ratio}%</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableBody colSpan="2">평균 대비 {data.comment}</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 1}>
                                                    <LoanTableTitle colSpan="2">이 상품을 이용할 시</LoanTableTitle>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>총 상환 금액</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.total_repay)}(원)</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>대출 총 이자</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.interest)}(원)</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>달 상환 금액</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.month_repay)}(원)</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 1}>
                                                    <LoanTableTitle colSpan="2">DSR 기준 별 대출 한도에요</LoanTableTitle>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>40%</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.limit_amount[0])}(원)</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>70%</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.limit_amount[1])}(원)</LoanTableBody>
                                                </LoanTableRow>
                                                <LoanTableRow isEven={index % 2 === 0}>
                                                    <LoanTableHeader>90%</LoanTableHeader>
                                                    <LoanTableBody>{addcommatonumber(data.limit_amount[2])}(원)</LoanTableBody>
                                                </LoanTableRow>
                                            </tbody>
                                        </table>
                                        <br />
                                    </LoanDetail>
                                )}
                            </LoanContainer>
                        ))}
                        </LoanBox>
                    )}
                </>
            ) : (
                <>
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
            {NoInputError && <p style={{ color: 'red' }}>{NoInputError}</p>}
            <InputButton onClick={sendDataToServer}>입력하기</InputButton>
            </>
            )}

        </Container>
    );
};

export default ScoreInput;
