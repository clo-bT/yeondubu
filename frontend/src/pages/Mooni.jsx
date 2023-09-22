import React from 'react';
import Menubar from '../components/Common/Menubar';
import MonniHeader from '../components/Monni/MonniHeader';
import MonniInfo from '../components/Monni/MonniInfo';

const Mooni = () => {
    return (
        <div>
            <MonniHeader />
            <MonniInfo />
            <Menubar />
        </div>
    );
};

export default Mooni;