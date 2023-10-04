import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin-top: -25px;
  margin-left: 20px;
  margin-bottom: 100px;
  
`;

const FirstTag = styled.p`
  color: #000;
  text-align: left;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 40px;
`;

const SecondTag = styled.p`
  color: #000;
  text-align: left;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

`;

const ThirdTag = styled.p`
  color: #676767;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-wrap: wrap; /* 부모 요소를 가로로 나열하고 넘칠 경우 줄 바꿈 */
  gap: 20px;
 
`;

const ThirdBox = styled.div`
  background-color: #ffebeb;
  padding: 10px;
  border-radius: 8px;
  flex-basis: calc(33.33% - 20px); /* 한 행에 3개의 ThirdBox가 나오도록 너비 조절 */
  box-sizing: border-box; 

`

const CheckListUpdate = () => {
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
    }
  }, [accessToken]);

  

  return (
    <Container>
      {data.map((item, firstTagIndex) => (
        <div key={item.first_tag_id}>
          <FirstTag>{item.first_tag_name}</FirstTag>
          {item.tag_second_expenditure_dto_list.map((secondItem, secondTagIndex) => (
            <div key={secondItem.second_tag_id}>
              <SecondTag>{secondItem.second_tag_name}</SecondTag>
      
              <ThirdTag>
                {secondItem.tag_third_expenditure_dto_list.map((thirdItem, thirdTagIndex) => (
                  <ThirdBox key={thirdItem.third_tag_id}>
                    {thirdItem.third_tag_name}
                  </ThirdBox>
                ))}
              </ThirdTag>

            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default CheckListUpdate;