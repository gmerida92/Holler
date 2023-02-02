import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { loadUserDetail } from '../../store/user'
import { loadAllReviewsByUser } from '../../store/review';
import { loadAllBusinessesByUser } from '../../store/business';


import NavigationBarActive from '../NavigationBar/NavigationBarActive';
import ProfileContainer from './ProfileContainer/ProfileContainer'

function ProfilePage() {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserDetail(sessionUser.id))
        dispatch(loadAllReviewsByUser())
        dispatch(loadAllBusinessesByUser())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />

    return (
        <>
            <NavigationBarActive />
            <ProfileContainer id={sessionUser.id} />
        </>
    )
}

export default ProfilePage;