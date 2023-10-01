import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
  
          console.log('그래프 요청 성공:', response.data);
          setData(response.data); // 데이터를 상태에 저장
  
          // 데이터를 챗봇 메시지로 표시
          response.data.forEach((item) => {
            const message = createChatBotMessage(`
              정책: ${item.policy}
              요약: ${item.short_summary}
              부처: ${item.tag}
              하위 부처: ${item.sub_tag}
              [자세히 보기](${item.url})
            `);
  
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
