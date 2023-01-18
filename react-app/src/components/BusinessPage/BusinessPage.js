import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import NavigationBarActive from '../NavigationBar/NavigationBarActive';



function BusinessPage() {
    const { id } = useParams();
    const dispatch = useDispatch()

    // useEffect(() => {
    // }, [dispatch])

    return (
        <>
            <NavigationBarActive />
        </>
    )
}

export default BusinessPage;
