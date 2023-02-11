import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import EditBusinessForm from './EditBusinessForm/EditBusinessForm';
import EditAttributeForm from './EditAttributesForm/EditAttributeForm';
import EditCatgoryForm from './EditCategoryForm/EditCategoryForm';
import EditHoursForm from './EditHoursForm/EditHoursForm';

import { Box, Paper, Typography, Button } from '@mui/material';

import { loadSingleBusiness } from '../../../store/singleBusinessDetail';
import { loadSingleAttribute } from '../../../store/singleAttribute';
import { loadSingleBusinessCategory } from '../../../store/singleCategory';
import { loadSingleBusinessHour } from '../../../store/singleBusinessHour';
import { updateABusiness } from '../../../store/business';
import { updateAttributeForBusiness } from '../../../store/business_attribute';
import { updateCategoryForBusiness } from '../../../store/business_category';
import { updateHoursForBusiness } from '../../../store/business_hour';


function convertTimeObjectToString(dateTimeObject) {
    const timeString = dateTimeObject.toTimeString();
    const onlyTimeString = timeString.slice(0, 5);
    return onlyTimeString;
}



function EditBusinessPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(loadSingleBusiness(id))
        dispatch(loadSingleAttribute(id))
        dispatch(loadSingleBusinessCategory(id))
        dispatch(loadSingleBusinessHour(id))
    }, [id, dispatch])


    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector((state) => state?.singleBusiness[id]) || ''
    const businessAttribute = useSelector((state) => state?.singleAttribute[id]) || ''
    const businessCategory = useSelector((state) => state?.singleCategory[id]) || ''
    const businessHour = useSelector((state) => state.singleBusinessHour[id]) || ''

    const [errors, setErrors] = useState([])

    const [name, setName] = useState(business?.name);
    const [address, setAddress] = useState(business?.address);
    const [address2, setAddress2] = useState(business?.address_2);
    const [city, setCity] = useState(business?.city);
    const [state, setState] = useState(business?.state);
    const [postal, setPostal] = useState(business?.postal_code);
    const [country, setCountry] = useState(business?.country);
    const [phone, setPhone] = useState(business?.phone);
    const [latitude, setLatitude] = useState(business?.latitude);
    const [longitude, setLongitude] = useState(business?.longitude);
    const [webAddress, setWebAddress] = useState(business?.web_address);
    const [description, setDescription] = useState(business?.description);


    const [healthScore, setHealthScore] = useState(businessAttribute?.health_score);
    const [priceRange, setPriceRange] = useState(businessAttribute?.price_range);
    const [freeWiFi, setFreeWiFi] = useState(businessAttribute?.free_wifi);
    const [parkingLot, setParkingLot] = useState(businessAttribute?.parking_lot);
    const [valetParking, setValetParking] = useState(businessAttribute?.valet_parking);
    const [streetParking, setStreetParking] = useState(businessAttribute?.street_parking);
    const [garageParking, setGarageParking] = useState(businessAttribute?.garage_parking);
    const [bikeParking, setBikeParking] = useState(businessAttribute?.bike_parking);
    const [businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency] = useState(businessAttribute?.business_accepts_cryptocurrency);
    const [businessAcceptsCreditCard, setBusinessAcceptsCreditCard] = useState(businessAttribute?.business_accepts_credit_card);
    const [dogsAllowed, setDogsAllowed] = useState(businessAttribute?.dogs_allowed);
    const [wheelchairAccessible, setWheelChairAccessible] = useState(businessAttribute?.wheelchair_accessible);
    const [outsideSeating, setOutsideSeating] = useState(businessAttribute?.outdoor_seating);
    const [takesReservation, setTakesReservation] = useState(businessAttribute?.takes_reservation);
    const [offersCatering, setOffersCatering] = useState(businessAttribute?.offers_catering);
    const [offersTakeout, setOffersTakeout] = useState(businessAttribute?.offers_takeout);
    const [offersDelivery, setOffersDelivery] = useState(businessAttribute?.offers_delivery);
    const [goodForKids, setGoodForKids] = useState(businessAttribute?.good_for_kids);
    const [moderateNoise, setModerateNoise] = useState(businessAttribute?.moderate_noise);


    const [inputs, setInputs] = useState('');


    const [schedule, setSchedule] = useState({
        Monday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Tuesday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Wednesday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Thursday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Friday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Saturday: {
            id: null,
            openTime: null,
            closeTime: null
        },
        Sunday: {
            id: null,
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



    const onSubmit = async (e) => {
        // console.log('\n\n', 'HEREHERE', typeof postal, '\n\n')
        e.preventDefault()

        if (name.trim() == null || name.trim() == "" || name === " ") {
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
        
        if (postal.toString().trim() == null || postal.toString().trim() == "" || postal === " ") {
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

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i][0]
            if (input.trim() == null || input.trim() == "" || input.length === 0 || input === " ") {
                setErrors(['Category : Field Required'])
                
                return e.preventDefault()
            }
        }

        if (
            mondayOpen == null || mondayOpen === " "
            ||
            mondayClose == null || mondayClose === " "
            ||
            tuesdayOpen == null || tuesdayOpen === " "
            ||
            tuesdayClose == null || tuesdayClose === " "
            ||
            wednesdayOpen == null || wednesdayOpen === " "
            ||
            wednesdayClose == null || wednesdayClose === " "
            ||
            thursdayOpen == null || thursdayOpen === " "
            ||
            thursdayClose == null || thursdayClose === " "
            ||
            fridayOpen == null || fridayOpen === " "
            ||
            fridayClose == null || fridayClose === " "
            ||
            saturdayOpen == null || saturdayOpen === " "
            ||
            saturdayClose == null || saturdayClose === " "
            ||
            sundayOpen == null || sundayOpen === " "
            ||
            sundayClose == null || sundayClose === " "
        ) {
            setErrors(['Business Hours of Operation : All Fields Required'])
            return e.preventDefault()
        }


        let updatedBusinessData = {
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
        dispatch(updateABusiness(id, updatedBusinessData));


        let updatedAttributesData = {
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
        dispatch(updateAttributeForBusiness(businessAttribute.id, id, updatedAttributesData))


        inputs.forEach((input) => {
            let category = {
                category_name: input[0]
            }
            dispatch(updateCategoryForBusiness(input[1], id, category))
        })


        Object.keys(schedule).forEach((day) => {
            let hours = {
                day: day,
                open_time: convertTimeObjectToString(schedule[day]['openTime']),
                close_time: convertTimeObjectToString(schedule[day]['closeTime'])
            }
            dispatch(updateHoursForBusiness(schedule[day]['id'], id, hours))
        })

        setErrors([])

        history.push('/profile')
    }

    if (!sessionUser) return <Redirect to="/login" />

    return (
        <>
            <NavigationBarActive />
            <Paper sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <EditBusinessForm {...{
                    errors, setErrors, business, name, setName, address, setAddress, address2, setAddress2,
                    city, setCity, state, setState, postal, setPostal, country, setCountry,
                    phone, setPhone, latitude, setLatitude, longitude, setLongitude, webAddress, setWebAddress,
                    description, setDescription
                }} />
                <EditAttributeForm {...{
                    errors, setErrors, businessAttribute, healthScore, setHealthScore, priceRange, setPriceRange,
                    freeWiFi, setFreeWiFi, parkingLot, setParkingLot, valetParking, setValetParking,
                    streetParking, setStreetParking, garageParking, setGarageParking, bikeParking, setBikeParking,
                    businessAcceptsCryptocurrency, setBusinessAcceptsCryptocurrency, businessAcceptsCreditCard, setBusinessAcceptsCreditCard,
                    dogsAllowed, setDogsAllowed, wheelchairAccessible, setWheelChairAccessible, outsideSeating, setOutsideSeating,
                    takesReservation, setTakesReservation, offersCatering, setOffersCatering, offersTakeout, setOffersTakeout,
                    offersDelivery, setOffersDelivery, goodForKids, setGoodForKids, moderateNoise, setModerateNoise
                }} />
                <EditCatgoryForm {...{
                    errors, setErrors, businessCategory, inputs, setInputs
                }} />
                <EditHoursForm {...{
                    errors, setErrors, businessHour, schedule, setSchedule, mondayOpen, setMondayOpen, mondayClose, setMondayClose,
                    tuesdayOpen, setTuesdayOpen, tuesdayClose, setTuesdayClose, wednesdayOpen, setWednesdayOpen, wednesdayClose, setWednesdayClose,
                    thursdayOpen, setThursdayOpen, thursdayClose, setThursdayClose, fridayOpen, setFridayOpen, fridayClose, setFridayClose, saturdayOpen,
                    setSaturdayOpen, saturdayClose, setSaturdayClose, sundayOpen, setSundayOpen, sundayClose, setSundayClose
                }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 10, gap: 3}}>
                    {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {errors.map((error) => {
                            return (
                                <Box component="li" sx={{ color: 'red' }}>
                                    <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                                </Box>
                            )
                        })}
                    </Box>}
                    <Button type='submit' onClick={onSubmit} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Update Business</Button>
                </Box>
            </Paper>
        </>
    )
}

export default EditBusinessPage;