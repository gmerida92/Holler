import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Rating } from '@mui/material';

function RatingSubheader({ id }) {
    const business = useSelector((state) => state.singleBusiness[id]);

    return (
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', ml: -0.75 }}>
            <Rating sx={{ fontSize: '48px' }} name="read-only" value={business?.stars ? business.stars : ''} precision={0.5} readOnly />
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color:'white' }}>{business?.review_count} reviews</Typography>
        </Box>
    )
}

export default RatingSubheader;