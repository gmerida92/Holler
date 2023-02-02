import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import UserBusinessCard from './UserBusinessCard/UserBusinessCard';


function UserBusinesses({ id }) {
    const businesses = useSelector((state) => Object.values(state?.business));

    return (
        <Box>
            <Typography variant='h2' sx={{ fontSize: '21px', fontWeight: 'bold', color: '#f55d98', borderBottom: 1, borderColor: 'divider', paddingBottom: 1 }}>Busineses</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
                {businesses?.map((business) => {
                    return (
                        <UserBusinessCard business={business} />
                    )
                })}
            </Box>
        </Box>
    )
}

export default UserBusinesses;