// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';


const botName = '연두부';

const config = {
    initialMessages: [
      createChatBotMessage(
        "안녕하세요! 신혼부부 및 청년 최신 정책에 대해 알아봐요."
      ),
      createChatBotMessage(
        "궁금하신 지역을 알려주세요.",
      ),
    ],
    botName: botName,
    customStyles: {
      botMessageBox: {
        backgroundColor: '#FF5959',
      },
      chatButton: {
        backgroundColor: '#FF5959',
      },
    },
}
export default config;