import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import NavigationBarActive from '../NavigationBar/NavigationBarActive';
import CreateImageForm from './CreateImageForm/CreateImageForm';

function AddImagePage() {
    const sessionUser = useSelector((state) => state?.session.user);

    if (!sessionUser) return <Redirect to="/login" />
    
    return (
        <>
            <NavigationBarActive />
            <CreateImageForm />
        </>
    )
}

export default AddImagePage;
