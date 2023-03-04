import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from './Header/Header';
import RatingSubheader from './RatingSubheader/RatingSubheader';
import AmenitiesSubheader from './AmenitiesSubheader/AmenitiesSubheader';
import BusinessHoursSubheader from './BusinessHoursSubheader/BusinessHoursSubheader';
import ImageBackgroundList from './ImageBackgroundList/ImageBackgroundList';

function TitleHeader({ id }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: 1, paddingTop: 5, paddingBottom: 5 }}>
            <Box>
                <ImageBackgroundList id={id} />
            </Box>
            <Box sx={{position: 'absolute', left: '16px', paddingTop:18}}>
                <Header id={id} />
                <RatingSubheader id={id} />
                <AmenitiesSubheader id={id} />
                <BusinessHoursSubheader id={id} />
            </Box>
        </Box>
    )
}

export default TitleHeader;