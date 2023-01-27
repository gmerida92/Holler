import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

function AboutBusiness({ id }) {

    const businessDetail = useSelector((state) => state?.singleBusiness[id])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: 'solid', borderColor: 'lightgray' }}>
            <Box>
                <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>About Business</Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '16px' }}>{businessDetail?.description}</Typography>
            </Box>
        </Box>
    )
}

export default AboutBusiness;