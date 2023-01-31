import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleIcon from '@mui/icons-material/Circle';

function createPriceRangeString(price_range) {
    let priceRange = '';
    for (let i = 0; i < price_range; i++) {
        priceRange = priceRange + '$'
    }
    return priceRange;
}


function createCategoryString(categories) {
    let length = categories?.length <= 3 ? categories?.length : 3;
    let amenitiesString = '';
    for (let i = 0; i < length; i++) {
        let category = categories[i]?.category_name;
        if (i < length - 1) {
            amenitiesString = amenitiesString + category + ", "
        }
        else {
            amenitiesString = amenitiesString + category
        }
    }
    return amenitiesString;
}



function AmenitiesSubheader({ id }) {
    const businessAmenities = useSelector((state) => state?.singleAttribute[id]) || ''
    const businessCategories = useSelector((state) => state?.singleCategory[id]) || ''

    const priceRangeArray = createPriceRangeString(businessAmenities?.price_range);
    const amenities = createCategoryString(businessCategories);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>{priceRangeArray}</Typography>
            <CircleIcon sx={{ fontSize: '5px', fontWeight: 'bold' }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>{amenities}</Typography>
        </Box>
    )
}

export default AmenitiesSubheader;