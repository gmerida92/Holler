import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid } from '@mui/material';

function HoursForm({ prevStep }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Hours of Operation</Typography>
            <Grid container spacing={2}>
                <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', paddingTop: 5 }} xs={12}>
                    <Button onClick={prevStep} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Back</Button>
                    {/* <Button onClick={nextStep} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Continue</Button> */}
                </Grid>
            </Grid>
        </Box>
    )
}

export default HoursForm;