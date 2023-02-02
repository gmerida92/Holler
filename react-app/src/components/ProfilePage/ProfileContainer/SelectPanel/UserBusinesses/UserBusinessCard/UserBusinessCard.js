import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography, Rating } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

import { loadAllBusinessAttribute } from '../../../../../../store/business_attribute';
import { loadAllBusinessCategory } from '../../../../../../store/business_category';

function convertDateTimeStringToDateString(dateTimeString) {
    let dateTime = new Date(dateTimeString);
    let dateString = `${dateTime?.getMonth() + 1}/${dateTime?.getDate()}/${dateTime?.getFullYear()}`;
    return dateString;
}

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

function UserBusinessCard({ business }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinessCategory(business?.id))
        dispatch(loadAllBusinessAttribute(business?.id))
    }, [dispatch])

    const businessAttribute = useSelector((state) => state.businessAttribute[business?.id]) || ''
    const businessCategories = useSelector((state) => state.businessCategory[business?.id]) || ''

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', borderBottom: 1, borderColor: 'divider', paddingBottom: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {business?.Images.length > 0 && <Box component='img' src={business?.Images[0]?.image_url} sx={{ height: '60px', width: '60px', borderRadius: '10%', objectFit: 'cover' }} />}

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>{business?.name}</Typography>

                    <Rating sx={{ fontSize: '20px' }} name="read-only" value={business?.stars} readOnly />

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '12px' }}>{createPriceRangeString(businessAttribute?.price_range)}</Typography>
                        <CircleIcon sx={{ fontSize: '2px' }} />
                        <Typography sx={{ fontSize: '12px' }}>{createCategoryString(businessCategories)}</Typography>
                    </Box>

                    <Typography sx={{ fontSize: '12px' }}>{business?.address}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '12px' }}>{business?.city},</Typography>
                        <Typography sx={{ fontSize: '12px' }}>{business?.state?.slice(0, 2)?.toUpperCase()}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>{business?.postal_code}</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default UserBusinessCard;