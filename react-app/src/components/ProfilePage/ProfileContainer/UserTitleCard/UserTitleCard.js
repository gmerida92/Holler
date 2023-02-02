import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Avatar, Box, Typography } from '@mui/material';

function UserTitleCard({ id }) {
    const user = useSelector((state) => state?.user[id])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ width: '200px', height: '200px' }} alt={user?.profile_name} src={user?.profile_image} />
            <Box>
                <Typography variant='h1' sx={{ fontSize: '30px' }}>{user?.profile_name}</Typography>
                <Typography variant='h3' sx={{ fontSize: '16px' }}>From {user?.location}</Typography>
            </Box>
        </Box>
    )
}

export default UserTitleCard;