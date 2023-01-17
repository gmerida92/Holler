import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import { loadAllReviewsForBusiness } from "../../../../store/review";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


function randomSampleReview(arrayOfReviews) {
    if (!arrayOfReviews) {
        return ''
    }

    for (let i = 0; i < arrayOfReviews.length; i++) {
        let reviewToCheck = arrayOfReviews[i];

        if (reviewToCheck.stars >= 4) {
            return reviewToCheck
        }
    }

    return arrayOfReviews[0]
}


function truncate(str, max = 150, len = 125) {
    if(!str) {
        return ''
    }

    return str.length > max ? `${str.substring(0, len)} ...` : str
}


function ReviewSample({ id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllReviewsForBusiness(id))
    }, [dispatch]);

    const allReviews = useSelector(state => state.review);
    const reviewsForBusiness = allReviews[id];
    const sampleReview = randomSampleReview(reviewsForBusiness);


    return (
        <Box sx={{mb:2, display:'flex', alignItems:"flex-start"}}>
            <ChatBubbleOutlineIcon sx={{mt:0.4, mr:1, fontSize:"12px"}}/>
            <Typography variant="body2" color='grey'>{`"${truncate(sampleReview.review)}"`}</Typography>
        </Box>
    )
}

export default ReviewSample;