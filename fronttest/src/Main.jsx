import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const handleMove = () => {
        navigate('/page')
    }
    return (
        <div>
            하이 여기는 현대오토에버
            <button onClick={handleMove}>이거 누르면 다른 페이지</button>
        </div>
    );
};

export default Main;