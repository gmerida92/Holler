import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import NavigationBarActive from '../NavigationBar/NavigationBarActive';

import { loadSingleBusiness } from '../../store/singleBusinessDetail';

function BusinessPage() {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSingleBusiness(id))
    }, [dispatch])

    return (
        <>
            <NavigationBarActive />
        </>
    )
}

export default BusinessPage;