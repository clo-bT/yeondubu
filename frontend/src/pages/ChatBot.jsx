import React from 'react';
import ChatBotHeader from '../components/ChatBot/ChatBotHeader'
import config from '../components/ChatBot/config.js';
import MessageParser from '../components/ChatBot/MessageParser';
import ActionProvider from '../components/ChatBot/ActionProvider';
import Chatbot from 'react-chatbot-kit'
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";


const ChatBot = () => {
    return (
        <div>
            <ChatBotHeader/>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                headerText='연두부 Chatbot'
                placeholderText='Input placeholder'
                runInitialMessagesWithHistory
                disableScrollToBottom
            />
        </div>
    );
};

export default ChatBot;