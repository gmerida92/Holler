import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

function Location({ id }) {
    const business = useSelector((state) => state?.singleBusiness[id]) || ''

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '14px' }}>{business?.address}</Typography>
            {business?.address && <Typography sx={{ fontSize: '14px' }}>{business?.address_2}</Typography>}
            <Typography sx={{ fontSize: '14px' }}>{`${business?.city}, ${business?.state?.slice(0, 2)?.toUpperCase()}`}</Typography>
            <Typography sx={{ fontSize: '14px' }}>{business?.postal_code}</Typography>
        </Box>
    )
}

export default Location;