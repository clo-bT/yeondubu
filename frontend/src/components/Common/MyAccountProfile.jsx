import React from 'react';
import wife from '../../assets/Common/wife.svg';
import styled from 'styled-components';

const WifeImg = styled.img`
width: 50px;
height: 50px;
flex-shrink: 0;
border-radius: 50px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const MyAccountProfile = () => {
    return (
        <div>
            <a href="/">뒤로가기</a>
            <WifeImg />
        </div>
    );
};

export default MyAccountProfile;