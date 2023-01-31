import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Paper } from '@mui/material';

function ContactDetails({ id }) {
    const business = useSelector((state) => state?.singleBusiness[id])
    console.log('HEREER!!!', business)

    return (
        <Paper elevation={3} sx={{ border: "solid", borderColor: 'lightgray', position: 'sticky', top: 110 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>

                <Box sx={{ paddingBottom: 1 }} >
                    <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: '16px' }}>{business?.web_address}</Typography>
                </Box>

                <Box sx={{ borderTop: 'solid', borderColor: 'lightgray', paddingTop: 1, paddingBottom: 1 }}>
                    <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: '16px' }}>{business?.phone}</Typography>
                </Box>

                <Box sx={{ borderTop: 'solid', borderColor: 'lightgray', paddingTop: 1 }}>
                    <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: '16px' }}>{`${business?.address} ${business?.city}, ${business?.state.slice(0, 2).toUpperCase()}`}</Typography>
                    <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: '16px' }}>{business?.postal_code}</Typography>
                </Box>

            </Box>
        </Paper>

    )
}

export default ContactDetails;