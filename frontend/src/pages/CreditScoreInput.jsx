import React from 'react';
// import ScoreInputHeader from '../components/CreditScoreInput/ScoreInputHeader';
import ScoreInput from '../components/CreditScoreInput/ScoreInput';
import Menubar from '../components/Common/Menubar';

const CreditScoreInput = () => {
    return (
        <div>
            {/* <ScoreInputHeader/> */}
            <ScoreInput />
            <Menubar/>
        </div>
    );
};

export default CreditScoreInput;