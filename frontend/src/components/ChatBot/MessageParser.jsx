import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        // 사용자의 메시지를 분석하고 특정 동작을 수행하는 로직을 작성합니다.
        const tagName = message.trim(); // 입력한 데이터를 양쪽 공백을 제거한 후 tagName으로 설정
    
        // tagName이 비어있지 않으면 fetchDataForLocation 액션을 호출
        if (tagName) {
          actions.fetchDataForLocation(tagName);
        }
      };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
