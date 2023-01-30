import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Rating } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function convertDateTimeStringToDateString(dateTimeString) {
    let dateTime = new Date(dateTimeString);
    let dateString = `${dateTime?.getMonth() + 1}/${dateTime?.getDate()}/${dateTime?.getFullYear()}`;
    return dateString;
}

function ReviewCard({ review }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar alt={review?.Owner?.first_name} src={review?.Owner?.profile_image} sx={{ width: 65, height: 65 }} />
                <Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{review?.Owner?.profile_name}</Typography>
                    <Typography sx={{ fontSize: '14px' }}>{review?.Owner?.location}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Rating value={review?.stars} readOnly />
                <Typography sx={{ fontSize: '14px', color: 'gray' }}>{convertDateTimeStringToDateString(review?.created_at)}</Typography>
            </Box>

            <Box>
                <Typography sx={{ fontSize: '14px', color: 'gray' }}>{review?.review}</Typography>
            </Box>
        </Box>
    )
}

export default ReviewCard;