import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { loadAllBusinessAttribute } from '../../../../../../store/business_attribute';
import { loadAllBusinessCategory } from '../../../../../../store/business_category';

import { Box, Typography, Rating } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

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



function UserReviewCard({ review }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinessCategory(review?.business_id))
        dispatch(loadAllBusinessAttribute(review?.business_id))
    }, [dispatch])

    const businessAttribute = useSelector((state) => state.businessAttribute[review?.business_id]) || ''
    const businessCategories = useSelector((state) => state.businessCategory[review?.business_id]) || ''

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', borderBottom: 1, borderColor: 'divider', paddingBottom: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {review?.Images.length > 0 && <Box component='img' src={review?.Images[0]?.image_url} sx={{ height: '60px', width: '60px', borderRadius: '10%', objectFit: 'cover' }} />}

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>{review?.Business?.name}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '12px' }}>{createPriceRangeString(businessAttribute?.price_range)}</Typography>
                        <CircleIcon sx={{ fontSize: '2px' }} />
                        <Typography sx={{ fontSize: '12px' }}>{createCategoryString(businessCategories)}</Typography>
                    </Box>

                    <Typography sx={{ fontSize: '12px' }}>{review?.Business.address}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '12px' }}>{review?.Business?.city},</Typography>
                        <Typography sx={{ fontSize: '12px' }}>{review?.Business?.state?.slice(0, 2)?.toUpperCase()}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>{review?.Business?.postal_code}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, paddingTop: 2, paddingBottom: 1 }}>
                <Rating sx={{ fontSize: '25px' }} name="read-only" value={review?.stars} readOnly />
                <Typography sx={{ fontSize: '14px' }}>{convertDateTimeStringToDateString(review.created_at)}</Typography>
            </Box>

            <Box sx={{ paddingBottom: 1 }}>
                <Typography sx={{ fontSize: '14px' }}>{review?.review}</Typography>
            </Box>

        </Box>
    )
}

export default UserReviewCard;