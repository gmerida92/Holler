import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography, Container, Link } from '@mui/material';

import UserTitleCard from './UserTitleCard/UserTitleCard';
import SelectPanel from './SelectPanel/SelectPanel'

function ProfileContainer({ id }) {
    const user = useSelector((state) => state?.user[id])

    return (
        <Container maxWidth='lg' sx={{ height: '100%', background: 'white', paddingBottom: 5, paddingTop: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <UserTitleCard id={id} />
                <SelectPanel id={id} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>About</Typography>
                    <Link href="https://github.com/gmerida92">Github</Link>
                    <Link href="https://www.linkedin.com/in/george-merida-441988140">LinkedIn</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default ProfileContainer;