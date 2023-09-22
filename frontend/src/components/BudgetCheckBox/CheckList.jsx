import React from 'react';
import styled from 'styled-components';
import { AiTwotoneSetting } from "react-icons/ai";

const SettingIcon = styled(AiTwotoneSetting)`
color : #FF6565;

`
const CheckList = () => {
    return (
        <div>
            <SettingIcon />
        </div>
    );
};

export default CheckList;