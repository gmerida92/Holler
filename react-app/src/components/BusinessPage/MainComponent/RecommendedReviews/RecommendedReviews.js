import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

// import ReviewChart from './ReviewChart/ReviewChart';
import ReviewCard from './ReviewCard/ReviewCard';

function RecommendedReviews({ id }) {
    const reviews = useSelector((state) => state?.singleBusinessReview[id])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>Recommended Reviews</Typography>
            {/* <ReviewChart id={id} /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {
                    reviews?.map((review) => {
                        return (
                            <ReviewCard review={review} />
                        )
                    })
                }
            </Box>
        </Box >
    )
}

export default RecommendedReviews;