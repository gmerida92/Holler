import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBarActive from '../NavigationBar/NavigationBarActive';

function LandingPage() {
    return (
        <>
            <NavigationBarActive />
        </>
    )
}

export default LandingPage;