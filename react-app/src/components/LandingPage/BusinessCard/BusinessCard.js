import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllBusinessCategory } from "../../../store/business_category";
import { loadAllBusinessAttribute } from "../../../store/business_attribute";
import { loadAllBusinessHour } from "../../../store/business_hour";

import { Card, CardContent, Rating, CardActions, CardMedia, Typography, Box, Button, CardActionArea } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


import ImageCarousel from "./ImageCarousel/ImageCarousel";
import RatingDetail from "./RatingDetail/RatingDetail";
import TimeComponent from "./TimeComponent/TimeComponent";
import ReviewSample from "./ReviewSample/ReviewSample";




function BusinessCard({ business }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinessCategory(business.id))
        dispatch(loadAllBusinessAttribute(business.id))
    }, [dispatch])

    const business_categories = useSelector((state) => Object.values(state.businessCategory))
    const business_attribute = useSelector((state) => Object.values(state.businessAttribute))


    const categoriesCurrentBusiness = business_categories.filter((businessCategory) => {
        return businessCategory.business_id === business.id
    })
    const attributesCurrentBusiness = business_attribute.filter((businessAttribute) => {
        return businessAttribute.business_id === business.id
    })

    const categoriesCurrentBusinessLength = categoriesCurrentBusiness.length > 3 ? 3 : categoriesCurrentBusiness.length;

    return (
        <Card sx={{ width: 700, height: 250, mb: 2, ml: 10 }}>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <ImageCarousel images={business.Images} />
                    <Box sx={{ ml: 3 }}>

                        <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 'bold' }}>{business.name}</Typography>
                        <RatingDetail business={business} />

                        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            {categoriesCurrentBusiness.slice(0, categoriesCurrentBusinessLength).map((categoryObj) => {
                                return (
                                    <Typography align='center' variant="body2" sx={{ borderRadius: '5px', fontWeight: 'bold', color: 'grey', background: '#e6e6e6', width: `${categoryObj.category_name.length * 8.5}px`, mr: 1 }}>{categoryObj.category_name}</Typography>
                                )
                            })}
                            {[...Array(attributesCurrentBusiness[0]?.price_range)].map((index) => {
                                return (
                                    <Typography variant="body2"><AttachMoneyIcon key={index} sx={{ mr: -0.75, fontSize: 14, color: 'grey' }} /></Typography>
                                )
                            })}
                        </Box>

                        <TimeComponent id={business.id} />
                        <ReviewSample id={business.id}/>

                        <Box>
                            <Typography variant="body2">"Attributes"</Typography>
                        </Box>

                    </Box>

                </Box>
            </CardContent>
        </Card>
    )
}

export default BusinessCard;