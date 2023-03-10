import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavigationBarActive from '../NavigationBar/NavigationBarActive';
import BusinessCard from './BusinessCard/BusinessCard';
import MapPageA from '../MapComponent/map';

import { loadAllBusinesses } from '../../store/business';

import { Box } from '@mui/material';
import { Container } from '@mui/material';

function LandingPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinesses())
    }, [dispatch])

    const business = useSelector((state) => state.business)

    return (
        <>
            <NavigationBarActive />
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {Object.keys(business).map((businessId) => {
                        return (
                            <BusinessCard key={businessId} id={businessId} />
                        )
                    })}
                </Box>
                <Box>
                    <MapPageA />
                </Box>
            </Container>
        </>
    )
}

export default LandingPage;