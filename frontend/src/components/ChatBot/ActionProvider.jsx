import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Atag = styled.a`
  color: black;

`
const PolicyName = styled.p`
  font-weight: bold;

`


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
      const botMessage = createChatBotMessage('Hello. Nice to meet you.');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  
    const [accessToken, setAccessToken] = useState('');
    const [data, setData] = useState([]); // 데이터를 저장할 상태 추가
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      setAccessToken(token);
    }, []);
    


  
    const fetchDataForLocation = async (tagName) => {
      console.log(accessToken);
      console.log(tagName);
      

      if (accessToken) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/policy/${tagName}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          console.log('요청 성공:', response.data);
          setData(response.data);
  
          createChatBotMessage(
            '네! ${tagNmae}의 최신 정책 알려드릴게요!'
          )
          response.data.forEach((item) => {
            const message = createChatBotMessage(
              <div>
                <PolicyName>
                  {item.policy}
                </PolicyName>
                <p>
                  - {item.tag} {item.sub_tag}
                </p>
                <p>
                  - {item.short_summary}
                </p>
                <p>
                  <Atag href={item.url} target="_blank" rel="noopener noreferrer">자세히 보기</Atag>
                </p>
              </div>
            );
  
            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, message],
            }));
          });
        } catch (error) {
          console.error('요청 실패:', error);
        }
      }
    };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            fetchDataForLocation,
          },
        });
      })}
    </div>
  );
    }


export default ActionProvider;
