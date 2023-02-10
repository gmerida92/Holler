import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { loadAllBusinessCategory } from "../../../store/business_category";
import { loadAllBusinessAttribute } from "../../../store/business_attribute";

import { Card, CardContent, Rating, CardActions, CardMedia, Typography, Box, Button, CardActionArea } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';

import ImageCarousel from "./ImageCarousel/ImageCarousel";
import RatingDetail from "./RatingDetail/RatingDetail";
import TimeComponent from "./TimeComponent/TimeComponent";
import ReviewSample from "./ReviewSample/ReviewSample";
import MainAttribute from "./MainAttributes/MainAttributes";




function BusinessCard({ id }) {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinessCategory(id))
        dispatch(loadAllBusinessAttribute(id))
    }, [id, dispatch])

    const business = useSelector((state) => state?.business[id])
    const business_categories = useSelector((state) => state?.businessCategory[id])
    const business_attribute = useSelector((state) => state?.businessAttribute[id])


    const categoriesCurrentBusinessLength = business_categories?.length > 3 ? 3 : business_categories?.length;

    return (
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'row', width: 700, height: 250, mb: 2}}>
            <Box sx={{ paddingLeft: 2, paddingTop: 2 }}>
                {business?.Images.length > 0 ? <ImageCarousel images={business?.Images} /> : <ImageTwoToneIcon sx={{ height: 220, width: 220 }} />}
            </Box>

            <CardActionArea component={Link} to={`/businesses/${id}`}>
                <CardContent>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ ml: 3 }}>

                            <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 'bold' }}>{business?.name}</Typography>
                            <RatingDetail stars={business?.stars} reviewCount={business?.review_count} />

                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                {business_categories?.slice(0, categoriesCurrentBusinessLength)?.map((categoryObj) => {
                                    return (
                                        <Typography align='center' variant="body2" sx={{ borderRadius: '5px', fontWeight: 'bold', color: 'grey', background: '#e6e6e6', width: `${categoryObj?.category_name?.length * 8.5}px`, mr: 1 }}>{categoryObj?.category_name}</Typography>
                                    )
                                })}
                                {[...Array(business_attribute?.price_range)].map((index) => {
                                    return (
                                        <Typography variant="body2"><AttachMoneyIcon key={index} sx={{ mr: -0.75, fontSize: 14, color: 'grey' }} /></Typography>
                                    )
                                })}
                            </Box>

                            <TimeComponent id={business?.id} />
                            {business?.review_count > 0 && <ReviewSample id={business?.id} />}
                            <MainAttribute attributes={business_attribute} />
                        </Box>

                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BusinessCard;