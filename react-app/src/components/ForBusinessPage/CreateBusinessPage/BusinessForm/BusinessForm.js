import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';

import { createNewBusiness } from '../../../../store/business';

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

//   function formatUsPhone(phone) {

//     var phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);

//     phone = phone.trim();
//     var results = phoneTest.exec(phone);
//     if (results !== null && results.length > 8) {

//         return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" ? " x" + results[8] : "");

//     }
//     else {
//          return phone;
//     }
// }

function BusinessForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [webAddress, setWebAddress] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        let newBusiness = {
            name: name,
            address: address,
            address_2: address2,
            city: city,
            state: state,
            postal_code: postal,
            country: "United States of America",
            phone: phone,
            web_address: webAddress,
            is_open: true,
            latitude: latitude,
            longitude: longitude,
            description: description
        }

        console.log('HEREHER', newBusiness)

        // return dispatch(createNewBusiness(newBusiness)).then(() => { <Redirect to='/' />; })
        dispatch(createNewBusiness(newBusiness))

        return history.push("/");
        // return <Redirect to='/' />;
    }

    return (
        // <form>
        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Your Business</Typography>
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Latitude'
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        value={latitude}
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label='Longitude'
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        value={longitude}
                        fullWidth
                        size='small'
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
                    />
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                    <Button type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Create Business</Button>
                </Grid>
            </Grid>
        </Box>
        // </form>
    )
}

export default BusinessForm;