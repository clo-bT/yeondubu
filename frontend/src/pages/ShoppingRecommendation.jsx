import React from 'react';
import RecommendationHeader from '../components/ShoppingRecommendation/RecommendationHeader';
import RecommendationFilter from '../components/ShoppingRecommendation/RecommendationFilter';
import Menubar from '../components/Common/Menubar';

const ShoppingRecommendation = () => {
    return (
        <div>
            <RecommendationHeader />
            <RecommendationFilter />
            <Menubar />
        </div>
    );
};

export default ShoppingRecommendation;