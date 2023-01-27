import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TitleHeader from './TitleHeader/TitleHeader';
import UtilityButtons from './UtilityButtons/UtilityButtons';
import LocationHours from './LocationHours/LocationHours';
import AboutBusiness from './AboutBusiness/AboutBusiness';
import AmenitiesMore from './AmenitiesMore/AmenitiesMore';

import { Container } from '@mui/system';
import { Box } from '@mui/material';

function MainComponent({ id }) {
    return (
        <Container sx={{ background: "white", borderRadius: '5px', display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 5, mt: 5, width: '50%' }}>
                <TitleHeader id={id} />
                <UtilityButtons id={id} />
                <LocationHours id={id} />
                <AmenitiesMore id={id} />
                <AboutBusiness id={id} />
            </Box>
            {/* <Box>
                <ContactDetails />
            </Box> */}
        </Container>
    )
}

export default MainComponent;