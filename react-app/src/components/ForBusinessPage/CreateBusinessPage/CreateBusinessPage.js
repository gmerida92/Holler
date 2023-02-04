import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, TextField, Button, Typography, Paper } from '@mui/material';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import BusinessForm from './BusinessForm/BusinessForm';
import AttributesForm from './AttributesForm/AttributesForm';
import CategoryForm from './CategoryForm/CategoryForm';
import HoursForm from './HoursForm/HoursForm';

function CreateBusinessPage() {

    const [step, setStep] = useState(1);

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

    const [healthScore, setHealthScore] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [freeWiFi, setFreeWiFi] = useState(false);
    const [parkingLot, setParkingLot] = useState(false);
    const [valetParking, setValetParking] = useState(false);
    const [streetParking, setStreetParking] = useState(false);
    const [garageParking, setGarageParking] = useState(false);
    const [bikeParking, setBikeParking] = useState(false);
    const [businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency] = useState(false);
    const [businessAcceptsCreditCard, setBusinessAcceptsCreditCard] = useState(false);
    const [dogsAllowed, setDogsAllowed] = useState(false);
    const [wheelchairAccessible, setWheelchairAccesible] = useState(false);
    const [outsideSeating, setOutsideSeating] = useState(false);
    const [takesReservation, setTakesReservation] = useState(false);
    const [offersCatering, setOffersCatering] = useState(false);
    const [offersTakeout, setOffersTakeout] = useState(false);
    const [offersDelivery, setOffersDelivery] = useState(false);
    const [goodForKids, setGoodForKids] = useState(false);
    const [moderateNoise, setModerateNoise] = useState(false);

    const [inputs, setInputs] = useState([])
    const [categories, setCategories] = useState([])


    const sessionUser = useSelector((state) => state.session.user)

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    if (!sessionUser) return <Redirect to="/login" />

    return (
        <>
            <NavigationBarActive />
            <Paper sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
                {step === 1 && <BusinessForm nextStep={nextStep}
                    {...{
                        name, setName, address, setAddress, address2, setAddress2,
                        city, setCity, state, setState, postal, setPostal, country, setCountry,
                        phone, setPhone, latitude, setLatitude, longitude, setLongitude, webAddress, setWebAddress,
                        description, setDescription
                    }} />}
                {step === 2 && <AttributesForm prevStep={prevStep} nextStep={nextStep}
                    {...{
                        healthScore, setHealthScore, priceRange, setPriceRange,
                        freeWiFi, setFreeWiFi, parkingLot, setParkingLot, valetParking, setValetParking,
                        streetParking, setStreetParking, garageParking, setGarageParking, bikeParking, setBikeParking,
                        businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency, businessAcceptsCreditCard, setBusinessAcceptsCreditCard,
                        dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelchairAccesible, outsideSeating, setOutsideSeating,
                        takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
                        offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise
                    }} />}
                {step === 3 && <CategoryForm prevStep={prevStep} nextStep={nextStep} {...{ setCategories, inputs, setInputs }} />}
                {step === 4 && <HoursForm prevStep={prevStep} />}
            </Paper>
        </>
    )
}

export default CreateBusinessPage;