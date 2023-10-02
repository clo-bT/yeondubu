import React from 'react';
import styled from 'styled-components';
import tofu_logo from '../../assets/Common/tofu_logo.svg'

const Img = styled.img`
margin-right : 10px;
`;

const FlightBotAvatar = () => {
    return (
        <div>
        <Img src={tofu_logo} />
      </div>
    );
};

export default FlightBotAvatar;