import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useHistory } from "react-router-dom";



import { Box, TextField, Button, Typography, Grid } from '@mui/material';


function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}


function BusinessForm({ nextStep, errors, setErrors, name, setName, address, setAddress,
    address2, setAddress2, city, setCity, state, setState, postal, setPostal, country,
    setCountry, phone, setPhone, latitude, setLatitude, longitude, setLongitude, webAddress,
    setWebAddress, description, setDescription }) {

    const onValidate = (e) => {
        if (name.trim() == null || name.trim() == "" || name === " ") {
            // let newErrors = ['Business Name : Field Required']
            // setErrors(newErrors)
            setErrors(['Business Name : Field Required'])
            return e.preventDefault()
        }
        if (address.trim() == null || address.trim() == "" || address === " ") {
            setErrors(['Address : Field Required'])
            return e.preventDefault()
        }
        if (city.trim() == null || city.trim() == "" || city === " ") {
            setErrors(['City : Field Required'])
            return e.preventDefault()
        }
        if (state.trim() == null || state.trim() == "" || state === " ") {
            setErrors(['State : Field Required'])
            return e.preventDefault()
        }
        if (postal.trim() == null || postal.trim() == "" || postal === " ") {
            setErrors(['Postal Code : Field Required'])
            return e.preventDefault()
        }
        if (phone.trim() == null || phone.trim() == "" || phone === " ") {
            setErrors(['Phone Number : Field Required'])
            return e.preventDefault()
        }

        if (latitude.toString().trim() == null || latitude.toString().trim() == "" || latitude === " ") {
            setErrors(['Latitude : Field Required'])
            return e.preventDefault()
        }
        if (longitude.toString().trim() == null || longitude.toString().trim() == "" || longitude === " ") {
            setErrors(['Longitude : Field Required'])
            return e.preventDefault()
        }

        // return e.preventDefault()
        setErrors([])
        nextStep()

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Your Business</Typography>
            {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {errors.map((error) => {
                    return (
                        <Box component="li" sx={{ color: 'red' }}>
                            <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                        </Box>
                    )
                })}
            </Box>}
            <Typography variant='body' sx={{ display: 'flex' }}>Add information about your business below.</Typography>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Business Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Address'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Apt, suite, etc. (optional)'
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='City'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='State'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Postal Code'
                        onChange={(e) => setPostal(e.target.value)}
                        value={postal}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Country'
                        onChange={(e) => setCountry(e.target.value)}
                        value={"United States of America"}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Phone Number'
                        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                        value={phone}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Web Address'
                        onChange={(e) => setWebAddress(e.target.value)}
                        value={webAddress}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        variant='outlined'
                        label='Latitude'
                        onChange={(e) => setLatitude(e.target.value)}
                        value={latitude}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        variant='outlined'
                        label='Longitude'
                        onChange={(e) => setLongitude(e.target.value)}
                        value={longitude}
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        size='small'
                        required
                    />
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                    <Button onClick={onValidate} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Continue</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BusinessForm;