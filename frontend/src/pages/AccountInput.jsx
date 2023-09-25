// 전체 container로 감싸기
// const Container = styled.div`

// display: flex;
// flex-direction: column;
// align-items: center;

// `
import React from 'react';
import DepositAccountInputForm from '../components/AccountInput/DepositAccountInputForm';

const AccountInput = () => {
    return (
        <div>
            <DepositAccountInputForm/>
        </div>
    );
};

export default AccountInput;