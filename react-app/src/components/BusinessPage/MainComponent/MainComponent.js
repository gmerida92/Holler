import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TitleHeader from './TitleHeader/TitleHeader';
import UtilityButtons from './UtilityButtons/UtilityButtons';
import LocationHours from './LocationHours/LocationHours';
import AboutBusiness from './AboutBusiness/AboutBusiness';
import AmenitiesMore from './AmenitiesMore/AmenitiesMore';
import RecommendedReviews from './RecommendedReviews/RecommendedReviews';
import ContactDetails from './ContactDetails/ContactDetails';
import NavigationBarActive from '../../NavigationBar/NavigationBarActive';


import { Container } from '@mui/system';
import { Box } from '@mui/material';

function MainComponent({ id }) {
    return (

        <Container maxWidth='lg' sx={{ background: "white", borderRadius: '5px', display: 'flex', width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', height: "100%", background: 'white' }}>
                <TitleHeader id={id} />

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignSelf: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 5, width: '65%' }}>
                        <UtilityButtons id={id} />
                        <LocationHours id={id} />
                        <AmenitiesMore id={id} />
                        <AboutBusiness id={id} />
                        <RecommendedReviews id={id} />
                    </Box>

                    <Box sx={{ width: '40%' }}>
                        <ContactDetails id={id} />
                    </Box>
                </Box>

            </Box>
        </Container>

    )
}

export default MainComponent;