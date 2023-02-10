import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography, Grid, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

function EditAttributeForm({ businessAttribute, healthScore, setHealthScore, priceRange, setPriceRange,
    freeWiFi, setFreeWiFi, parkingLot, setParkingLot, valetParking, setValetParking,
    streetParking, setStreetParking, garageParking, setGarageParking, bikeParking, setBikeParking,
    businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency, businessAcceptsCreditCard, setBusinessAcceptsCreditCard,
    dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelChairAccessible, outsideSeating, setOutsideSeating,
    takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
    offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise
}) {

    useEffect(() => {
        setHealthScore(businessAttribute?.health_score)
        setPriceRange(businessAttribute?.price_range)
        setFreeWiFi(businessAttribute?.free_wifi)
        setParkingLot(businessAttribute?.parking_lot)
        setValetParking(businessAttribute?.valet_parking)
        setStreetParking(businessAttribute?.street_parking)
        setGarageParking(businessAttribute?.garage_parking)
        setBikeParking(businessAttribute?.bike_parking)
        setBusinessAcceptsCryptocurrency(businessAttribute?.business_accepts_cryptocurrency)
        setBusinessAcceptsCreditCard(businessAttribute?.business_accepts_credit_card)
        setDogsAllowed(businessAttribute?.dogs_allowed)
        setWheelChairAccessible(businessAttribute?.wheelchair_accessible)
        setOutsideSeating(businessAttribute?.outdoor_seating)
        setTakesReservation(businessAttribute?.takes_reservation)
        setOffersCatering(businessAttribute?.offers_catering)
        setOffersTakeout(businessAttribute?.offers_takeout)
        setOffersDelivery(businessAttribute?.offers_delivery)
        setGoodForKids(businessAttribute?.good_for_kids)
        setModerateNoise(businessAttribute?.moderate_noise)
    }, [businessAttribute])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Edit Business Attributes</Typography>
            <Grid container spacing={2} columns={2}>
                <Grid item xs={1} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Health Score</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={healthScore || ''}
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
                            value={priceRange || ''}
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
                    <FormControlLabel control={<Checkbox checked={freeWiFi || false} onChange={(e) => setFreeWiFi(e.target.checked)} />} label="Free WiFi" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={parkingLot || false} onChange={(e) => setParkingLot(e.target.checked)} />} label="Parking Lot" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={valetParking || false} onChange={(e) => setValetParking(e.target.checked)} />} label="Valet Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={streetParking || false} onChange={(e) => setStreetParking(e.target.checked)} />} label="Street Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={garageParking || false} onChange={(e) => setGarageParking(e.target.checked)} />} label="Garage Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={bikeParking || false} onChange={(e) => setBikeParking(e.target.checked)} />} label="Bike Parking" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={businessAcceptsCryptocurrency || false} onChange={(e) => setBusinessAcceptsCryptocurrency(e.target.checked)} />} label="Business Accepts Cryptocurrency" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={businessAcceptsCreditCard || false} onChange={(e) => setBusinessAcceptsCreditCard(e.target.checked)} />} label="Business Accepts Credit Card" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={dogsAllowed || false} onChange={(e) => setDogsAllowed(e.target.checked)} />} label="Dogs Allowed" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={wheelchairAccessible || false} onChange={(e) => setWheelChairAccessible(e.target.checked)} />} label="Wheelchair Accessible" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={outsideSeating || false} onChange={(e) => setOutsideSeating(e.target.checked)} />} label="Outside Seating" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={takesReservation || false} onChange={(e) => setTakesReservation(e.target.checked)} />} label="Takes Reservation" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersCatering || false} onChange={(e) => setOffersCatering(e.target.checked)} />} label="Offers Catering" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersTakeout || false} onChange={(e) => setOffersTakeout(e.target.checked)} />} label="Offers Takeout" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={offersDelivery || false} onChange={(e) => setOffersDelivery(e.target.checked)} />} label="Offers Delivery" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={goodForKids || false} onChange={(e) => setGoodForKids(e.target.checked)} />} label="Good For Kids" />
                </Grid>
                <Grid item xs={1} >
                    <FormControlLabel control={<Checkbox checked={moderateNoise || false} onChange={(e) => setModerateNoise(e.target.checked)} />} label="Moderate Noise" />
                </Grid>

            </Grid>
        </Box>
    )
}

export default EditAttributeForm;