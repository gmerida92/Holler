import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavigationBarActive from '../NavigationBar/NavigationBarActive';
import BusinessCard from './BusinessCard/BusinessCard';

import { loadAllBusinesses } from '../../store/business';
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
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {Object.keys(business).map((businessId) => {
                    return (
                        <BusinessCard key={businessId} id={businessId} />
                    )
                })}
            </Container>
        </>
    )
}

export default LandingPage;