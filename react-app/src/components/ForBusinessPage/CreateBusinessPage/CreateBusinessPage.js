import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { createNewBusiness } from '../../../store/business';
import { createAttributeForBusiness } from '../../../store/business_attribute';
import { createCategoryForBusiness } from '../../../store/business_category';
import { createHoursForBusiness } from '../../../store/business_hour';

import { Box, TextField, Button, Typography, Paper } from '@mui/material';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import BusinessForm from './BusinessForm/BusinessForm';
import AttributesForm from './AttributesForm/AttributesForm';
import CategoryForm from './CategoryForm/CategoryForm';
import HoursForm from './HoursForm/HoursForm';
// import ReviewForms from './ReviewRorm/ReviewForm'

function convertTimeObjectToString(dateTimeObject) {
    const timeString = dateTimeObject.toTimeString();
    const onlyTimeString = timeString.slice(0, 8);
    return onlyTimeString;
}


function CreateBusinessPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [step, setStep] = useState(1);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('United States of America');
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
    const [wheelchairAccessible, setWheelChairAccessible] = useState(false);
    const [outsideSeating, setOutsideSeating] = useState(false);
    const [takesReservation, setTakesReservation] = useState(false);
    const [offersCatering, setOffersCatering] = useState(false);
    const [offersTakeout, setOffersTakeout] = useState(false);
    const [offersDelivery, setOffersDelivery] = useState(false);
    const [goodForKids, setGoodForKids] = useState(false);
    const [moderateNoise, setModerateNoise] = useState(false);

    const [inputs, setInputs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [schedule, setSchedule] = useState({
        Monday: {
            openTime: null,
            closeTime: null
        },
        Tuesday: {
            openTime: null,
            closeTime: null
        },
        Wednesday: {
            openTime: null,
            closeTime: null
        },
        Thursday: {
            openTime: null,
            closeTime: null
        },
        Friday: {
            openTime: null,
            closeTime: null
        },
        Saturday: {
            openTime: null,
            closeTime: null
        },
        Sunday: {
            openTime: null,
            closeTime: null
        }
    })
    const [mondayOpen, setMondayOpen] = useState(null);
    const [mondayClose, setMondayClose] = useState(null);
    const [tuesdayOpen, setTuesdayOpen] = useState(null);
    const [tuesdayClose, setTuesdayClose] = useState(null);
    const [wednesdayOpen, setWednesdayOpen] = useState(null);
    const [wednesdayClose, setWednesdayClose] = useState(null);
    const [thursdayOpen, setThursdayOpen] = useState(null);
    const [thursdayClose, setThursdayClose] = useState(null);
    const [fridayOpen, setFridayOpen] = useState(null);
    const [fridayClose, setFridayClose] = useState(null);
    const [saturdayOpen, setSaturdayOpen] = useState(null);
    const [saturdayClose, setSaturdayClose] = useState(null);
    const [sundayOpen, setSundayOpen] = useState(null);
    const [sundayClose, setSundayClose] = useState(null);


    const sessionUser = useSelector((state) => state.session.user)

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let newBusinessData = {
            name: name,
            address: address,
            address_2: address2,
            city: city,
            state: state,
            postal_code: postal,
            country: country,
            phone: phone,
            web_address: webAddress,
            is_open: true,
            latitude: latitude,
            longitude: longitude,
            description: description
        };
        let newBusiness = await dispatch(createNewBusiness(newBusinessData));

        let newAttributesData = {
            health_score: healthScore,
            price_range: priceRange,
            free_wifi: freeWiFi,
            parking_lot: parkingLot,
            valet_parking: valetParking,
            street_parking: streetParking,
            garage_parking: garageParking,
            bike_parking: bikeParking,
            business_accepts_cryptocurrency: businessAcceptsCryptocurrency,
            business_accepts_credit_card: businessAcceptsCreditCard,
            dogs_allowed: dogsAllowed,
            wheelchair_accessible: wheelchairAccessible,
            outdoor_seating: outsideSeating,
            takes_reservation: takesReservation,
            offers_catering: offersCatering,
            offers_takeout: offersTakeout,
            offers_delivery: offersDelivery,
            good_for_kids: goodForKids,
            moderate_noise: moderateNoise,
        };
        dispatch(createAttributeForBusiness(newBusiness.id, newAttributesData))

        console.log('Here1', categories)
        categories.forEach((category) => {
            let newCategory = {
                category_name: category
            }
            console.log("Here2", newBusiness.id, newCategory)
            dispatch(createCategoryForBusiness(newBusiness.id, newCategory))
        })

        // newCategory['category_name'] = category;
        // newCategory = {
        //     // business_id: newBusiness.id,
        //     category_name: category
        // }
        // Object.keys(schedule).forEach((day) => {
        //     let newHours = {
        //         day: day,
        //         open_time: convertTimeObjectToString(schedule[day]['openTime']),
        //         close_time: convertTimeObjectToString(schedule[day]['closeTime'])
        //     }

        //     // let newHours = {}
        //     // let newHours = {
        //     //     // business_id: newBusiness.id,
        //     //     day: day,
        //     //     open_time: convertTimeObjectToString(schedule[day]['openTime']),
        //     //     close_time: convertTimeObjectToString(schedule[day]['closeTime'])
        //     // }

        //     // newHours[day] = day;
        //     // newHours[open_time] = convertTimeObjectToString(schedule[day]['openTime']);
        //     // newHours[close_time] = convertTimeObjectToString(schedule[day]['closeTime']);

        //     dispatch(createHoursForBusiness(newBusiness.id, newHours))
        // })

        // history.push('/')
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
                        dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelChairAccessible, outsideSeating, setOutsideSeating,
                        takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
                        offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise
                    }} />}
                {step === 3 && <CategoryForm prevStep={prevStep} nextStep={nextStep} {...{ setCategories, inputs, setInputs }} />}
                {step === 4 && <HoursForm prevStep={prevStep} onSubmit={onSubmit} {...{
                    schedule, setSchedule, mondayOpen, setMondayOpen, mondayClose, setMondayClose,
                    tuesdayOpen, setTuesdayOpen, tuesdayClose, setTuesdayClose, wednesdayOpen, setWednesdayOpen, wednesdayClose, setWednesdayClose,
                    thursdayOpen, setThursdayOpen, thursdayClose, setThursdayClose, fridayOpen, setFridayOpen, fridayClose, setFridayClose, saturdayOpen,
                    setSaturdayOpen, saturdayClose, setSaturdayClose, sundayOpen, setSundayOpen, sundayClose, setSundayClose
                }} />}
                {/* {step === 5 && <ReviewForms prevStep={prevStep} {...{
                    name, setName, address, setAddress, address2, setAddress2,
                    city, setCity, state, setState, postal, setPostal, country, setCountry,
                    phone, setPhone, latitude, setLatitude, longitude, setLongitude, webAddress, setWebAddress,
                    description, setDescription, healthScore, setHealthScore, priceRange, setPriceRange,
                    freeWiFi, setFreeWiFi, parkingLot, setParkingLot, valetParking, setValetParking,
                    streetParking, setStreetParking, garageParking, setGarageParking, bikeParking, setBikeParking,
                    businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency, businessAcceptsCreditCard, setBusinessAcceptsCreditCard,
                    dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelchairAccesible, outsideSeating, setOutsideSeating,
                    takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
                    offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise
                }} />} */}
            </Paper>
        </>
    )
}

export default CreateBusinessPage;