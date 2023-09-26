import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page = () => {
    const navigate = useNavigate();
    const handleMove = () => {
        navigate('/')
    }
    return (
        <div>
            하이 싸피지롱
            <button onClick={handleMove}>이거 누르면 다른 페이지</button>
        </div>
    );
};

export default Page;