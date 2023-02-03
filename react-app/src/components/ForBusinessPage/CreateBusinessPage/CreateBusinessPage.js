import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, TextField, Button, Typography, Paper } from '@mui/material';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import BusinessForm from './BusinessForm/BusinessForm';

function CreateBusinessPage() {

    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) return <Redirect to="/signup" />

    return (
        <>
            <NavigationBarActive />
            <Paper sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
                <BusinessForm />
            </Paper>
        </>
    )
}

export default CreateBusinessPage;