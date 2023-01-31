import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import NavigationBarActive from '../NavigationBar/NavigationBarActive';
import MainComponent from './MainComponent/MainComponent';

import { loadSingleBusiness } from '../../store/singleBusinessDetail';
import { loadSingleAttribute } from '../../store/singleAttribute';
import { loadSingleBusinessCategory } from '../../store/singleCategory';
import { loadSingleBusinessHour } from '../../store/singleBusinessHour';
import { loadSingleReview } from '../../store/singleBusinessReview';


function BusinessPage() {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSingleBusiness(id))
        dispatch(loadSingleAttribute(id))
        dispatch(loadSingleBusinessCategory(id))
        dispatch(loadSingleBusinessHour(id))
        dispatch(loadSingleReview(id))
    }, [dispatch])

    return (
        <>
            <NavigationBarActive />
            <MainComponent id={id} />
        </>
    )
}

export default BusinessPage;