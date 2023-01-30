import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Paper } from '@mui/material';

function ContactDetails({ id }) {
    const business = useSelector((state) => state?.singleBusiness[id])
    console.log('HEREER!!!', business)

    return (
        <Paper>
            <Box>
                <Typography>{business?.web_address}</Typography>
                <Typography>{business?.phone}</Typography>
                <Typography>{`${business?.address} ${business?.city}, ${business?.state.slice(0,2).toUpperCase()}`}</Typography>
                <Typography>{business?.postal_code}</Typography>
            </Box>
        </Paper>

    )
}

export default ContactDetails;