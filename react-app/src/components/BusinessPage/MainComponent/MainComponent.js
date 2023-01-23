import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TitleHeader from './TitleHeader/TitleHeader';

import { Container } from '@mui/system';
import { Box } from '@mui/material';

function MainComponent({ id }) {
    return (
        <Container sx={{ background: "white", borderRadius: '5px', display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TitleHeader id={id} />
            </Box>
            {/* <Box>
                <ContactDetails />
            </Box> */}
        </Container>
    )
}

export default MainComponent;