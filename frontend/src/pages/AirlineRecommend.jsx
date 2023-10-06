import React from 'react';
import AirlineFilter from '../components/AirlineRecommend/AirlineFilter'
import AirlineList from '../components/AirlineRecommend/AirlineList'

const AirlineRecommend = () => {
    return (
        <div>
            <AirlineFilter/>
            <AirlineList/>
        </div>
    );
};

export default AirlineRecommend;