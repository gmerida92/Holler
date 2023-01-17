import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function checkOffersOutdoorSeating(outdoorSeatingAttribute) {
    if (outdoorSeatingAttribute !== undefined && outdoorSeatingAttribute === true) {
        return (
            <>
                <CheckIcon sx={{ fontSize: '16px', color: "green" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Outdoor seating</Typography>
            </>
        )
    }
    else if (outdoorSeatingAttribute !== undefined && outdoorSeatingAttribute === false) {
        return (
            <>
                <CloseIcon sx={{ fontSize: '16px', color: "red" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Outdoor seating</Typography>
            </>
        )
    }
    else { return '' }
}


function checkOffersDelivery(deliveryAttribute) {
    if (deliveryAttribute !== undefined && deliveryAttribute === true) {
        return (
            <>
                <CheckIcon sx={{ fontSize: '16px', color: "green" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Delivery</Typography>
            </>
        )
    }
    else if (deliveryAttribute !== undefined && deliveryAttribute === false) {
        return (
            <>
                <CloseIcon sx={{ fontSize: '16px', color: "red" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Delivery</Typography>
            </>
        )
    }
    else { return '' }
}


function checkOffersTakeout(takeoutAttribute) {
    if (takeoutAttribute !== undefined && takeoutAttribute === true) {
        return (
            <>
                <CheckIcon sx={{ fontSize: '16px', color: "green" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Takeout</Typography>
            </>
        )
    }
    else if (takeoutAttribute !== undefined && takeoutAttribute === false) {
        return (
            <>
                <CloseIcon sx={{ fontSize: '16px', color: "red" }} />
                <Typography variant="body2" sx={{ mr: 3, fontSize: '12px' }}>Takeout</Typography>
            </>
        )
    }
    else { return '' }
}



function MainAttribute({ attributes }) {

    const deliveryValidation = checkOffersDelivery(attributes?.offers_delivery);
    const outdoorSeatingValidation = checkOffersOutdoorSeating(attributes?.outdoor_seating);
    const takeoutValidation = checkOffersTakeout(attributes?.offers_takeout);

    return (
        <Box sx={{ display: "flex" }}>
            {outdoorSeatingValidation}
            {deliveryValidation}
            {takeoutValidation}
        </Box>
    )
}

export default MainAttribute;