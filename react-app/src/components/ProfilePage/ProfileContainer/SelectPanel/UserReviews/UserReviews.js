import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import UserReviewCard from './UserReviewCard/UserReviewCard';


function UserReviews({ id }) {
    const reviews = useSelector((state) => state?.review[id]);

    return (
        <Box>
            <Typography variant='h2' sx={{ fontSize: '21px', fontWeight: 'bold', color: '#f55d98', borderBottom: 1, borderColor: 'divider', paddingBottom: 1 }}>Reviews</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
                {reviews?.map((review) => {
                    return (
                        <UserReviewCard review={review} />
                    )
                })}
            </Box>
        </Box>
    )
}

export default UserReviews;