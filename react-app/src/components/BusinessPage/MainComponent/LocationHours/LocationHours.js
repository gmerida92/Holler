import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Location from './Location/Location';

import { Box, Typography } from '@mui/material';

function LocationHours({ id }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>
            <Box>
                <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>Location & Hours</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Location id={id} />
                {/* <Hours /> */}
            </Box>
        </Box>
    )
}

export default LocationHours;