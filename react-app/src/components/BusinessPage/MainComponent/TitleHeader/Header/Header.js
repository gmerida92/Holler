import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

function Header({ id }) {
    const business = useSelector((state) => state.singleBusiness[id]);

    return (
        <Box>
            <Typography sx={{ fontSize: '48px', fontWeight: 'Bold', color:'black' }} variant='h1'>{business?.name}</Typography>
        </Box>
    )
}

export default Header;