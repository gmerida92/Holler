import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from './Header/Header';
import RatingSubheader from './RatingSubheader/RatingSubheader';
import AmenitiesSubheader from './AmenitiesSubheader/AmenitiesSubheader';
import BusinessHoursSubheader from './BusinessHoursSubheader/BusinessHoursSubheader';

function TitleHeader({ id }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Header id={id} />
            <RatingSubheader id={id} />
            <AmenitiesSubheader id={id} />
            <BusinessHoursSubheader id={id} />
        </Box>
    )
}

export default TitleHeader;