import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography, Container } from '@mui/material';

import UserTitleCard from './UserTitleCard/UserTitleCard';
import SelectPanel from './SelectPanel/SelectPanel'

function ProfileContainer({ id }) {
    const user = useSelector((state) => state?.user[id])

    return (
        <Container maxWidth='lg' sx={{ height: '100%', background: 'white', paddingBottom: 5, paddingTop: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <UserTitleCard id={id} />
                <SelectPanel id={id} />
            </Box>
        </Container>
    )
}

export default ProfileContainer;