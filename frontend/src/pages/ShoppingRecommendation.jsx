import React from 'react';
import RecommendationHeader from '../components/ShoppingRecommendation/RecommendationHeader';
import RecommendationFilter from '../components/ShoppingRecommendation/RecommendationFilter';

const ShoppingRecommendation = () => {
    return (
        <div>
            <RecommendationHeader />
            <RecommendationFilter />
        </div>
    );
};

export default ShoppingRecommendation;