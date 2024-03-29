import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

function ReviewForm({ prevStep, name, address, address2, city, state, postal, country,
    phone, latitude, longitude, webAddress, description, healthScore, setHealthScore, priceRange, setPriceRange,
    freeWiFi, setFreeWiFi, parkingLot, setParkingLot, valetParking, setValetParking,
    streetParking, setStreetParking, garageParking, setGarageParking, bikeParking, setBikeParking,
    businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency, businessAcceptsCreditCard, setBusinessAcceptsCreditCard,
    dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelchairAccessible, outsideSeating, setOutsideSeating,
    takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
    offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise }) {
    return (
        <Box sx={{ height:'100%', display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Review Business and Confirm</Typography>
            <Grid container spacing={3} columns={2}>
                <Grid item xs={12}>
                    <TextField
                        label='Business Name'
                        type="text"
                        variant='filled'
                        defaultValue={name}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Address'
                        type="text"
                        variant='filled'
                        defaultValue={address}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Apt, suite, etc. (optional)'
                        type="text"
                        variant='filled'
                        defaultValue={address2}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='City'
                        type="text"
                        variant='filled'
                        defaultValue={city}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='State'
                        type="text"
                        variant='filled'
                        defaultValue={state}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Postal Code'
                        type="text"
                        variant='filled'
                        defaultValue={postal}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Country'
                        type="text"
                        variant='filled'
                        defaultValue={country}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Phone Number'
                        type="text"
                        variant='filled'
                        defaultValue={phone}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Web Address'
                        type="text"
                        variant='filled'
                        defaultValue={webAddress}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Latitude'
                        type="text"
                        variant='filled'
                        defaultValue={latitude}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Longitude'
                        type="text"
                        variant='filled'
                        defaultValue={longitude}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        multiline
                        rows={5}
                        variant='filled'
                        defaultValue={description}
                        fullWidth
                        size='small'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>

                <Grid item xs={1} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Health Score</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={healthScore}
                            label="Health Score"
                            onChange={(e) => setHealthScore(e.target.value)}
                        >
                            <MenuItem value={'A'}>A</MenuItem>
                            <MenuItem value={'B'}>B</MenuItem>
                            <MenuItem value={'C'}>C</MenuItem>
                            <MenuItem value={'D'}>D</MenuItem>
                            <MenuItem value={'F'}>F</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Price Range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={priceRange}
                            label="Price Range"
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={freeWiFi} onChange={(e) => setFreeWiFi(e.target.checked)} />} label="Free WiFi" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={parkingLot} onChange={(e) => setParkingLot(e.target.checked)} />} label="Parking Lot" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={valetParking} onChange={(e) => setValetParking(e.target.checked)} />} label="Valet Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={streetParking} onChange={(e) => setStreetParking(e.target.checked)} />} label="Street Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={garageParking} onChange={(e) => setGarageParking(e.target.checked)} />} label="Garage Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={bikeParking} onChange={(e) => setBikeParking(e.target.checked)} />} label="Bike Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={businessAcceptsCryptocurrency} onChange={(e) => setBusinessAcceptsCryptocurrency(e.target.checked)} />} label="Business Accepts Cryptocurrency" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={businessAcceptsCreditCard} onChange={(e) => setBusinessAcceptsCreditCard(e.target.checked)} />} label="Business Accepts Credit Card" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={dogsAllowed} onChange={(e) => setDogsAllowed(e.target.checked)} />} label="Dogs Allowed" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={wheelchairAccessible} onChange={(e) => setWheelchairAccessible(e.target.checked)} />} label="Wheelchair Accessible" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={outsideSeating} onChange={(e) => setOutsideSeating(e.target.checked)} />} label="Outside Seating" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={takesReservation} onChange={(e) => setTakesReservation(e.target.checked)} />} label="Takes Reservation" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersCatering} onChange={(e) => setOffersCatering(e.target.checked)} />} label="Offers Catering" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersTakeout} onChange={(e) => setOffersTakeout(e.target.checked)} />} label="Offers Takeout" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersDelivery} onChange={(e) => setOffersDelivery(e.target.checked)} />} label="Offers Delivery" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={goodForKids} onChange={(e) => setGoodForKids(e.target.checked)} />} label="Good For Kids" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={moderateNoise} onChange={(e) => setModerateNoise(e.target.checked)} />} label="Moderate Noise" />
                </Grid>


                <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
                    <Button onClick={prevStep} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Back</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
export default ReviewForm;