import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Paper, Typography, Button, Grid, TextField } from '@mui/material';


function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}


function EditBusinessForm({ errors, business, name, setName, address, setAddress, address2, setAddress2,
    city, setCity, state, setState, postal, setPostal, country, setCountry,
    phone, setPhone, latitude, setLatitude, longitude, setLongitude, webAddress, setWebAddress,
    description, setDescription }) {

    useEffect(() => {
        setName(business?.name)
        setAddress(business?.address)
        setAddress2(business?.address2)
        setCity(business?.city)
        setState(business?.state)
        setPostal(business?.postal_code)
        setCountry(business?.country)
        setPhone(business?.phone)
        setLatitude(business?.latitude)
        setLongitude(business?.longitude)
        setWebAddress(business?.web_address)
        setDescription(business?.description)
    }, [business])


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Edit Business Details</Typography>
            {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {errors.map((error) => {
                    return (
                        <Box component="li" sx={{ color: 'red' }}>
                            <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                        </Box>
                    )
                })}
            </Box>}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label='Business Name'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setName(e.target.value)}
                        value={name || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Address'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Apt, suite, etc. (optional)'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2 || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='City'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setCity(e.target.value)}
                        value={city || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='State'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setState(e.target.value)}
                        value={state || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Postal Code'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setPostal(e.target.value)}
                        value={postal || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Country'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setCountry(e.target.value)}
                        value={"United States of America" || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Phone Number'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                        value={phone || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Web Address'
                        type="text"
                        variant='outlined'
                        onChange={(e) => setWebAddress(e.target.value)}
                        value={webAddress || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Latitude'
                        type="number"
                        variant='outlined'
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        value={latitude || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Longitude'
                        type="number"
                        variant='outlined'
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        value={longitude || ''}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description || ''}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        size='small'
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditBusinessForm;