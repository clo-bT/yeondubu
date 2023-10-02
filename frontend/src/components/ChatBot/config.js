// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import FlightBotAvatar from './FlightBotAvatar';

const botName = '연두부';

const config = {
    initialMessages: [
      createChatBotMessage(
        "안녕하세요! 신혼부부 및 청년 최신 정책에 대해 알아봐요.궁금하신 지역을 알려주세요."
      ),

    ],
    botName: botName,
    customStyles: {
      botMessageBox: {
        backgroundColor: '#E6E6E6',
        color: '#FFFFF',
        
      },
      chatButton: {
        backgroundColor: '#FF5959',
      },
    },
    customComponents: {
    // Replaces the default bot avatar
    botAvatar: (props) => <FlightBotAvatar {...props} />,
    // Replaces the default user icon
    // userAvatar: (props) => <MyUserAvatar {...props} />,

  },
}
export default config;