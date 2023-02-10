import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import CreateRating from './CreateRating/CreateRating';
import CreateReviewDescription from './CreateReviewDescription/CreateReviewDescription';
import CreateReviewButtons from './CreateButton/CreateButton';

import { Box, Paper, Typography, Button } from '@mui/material';

import { createNewReview } from '../../../store/review';


function CreateReviewPage() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [rating, setRating] = useState(null);
    const [review, setReview] = useState(null);

    const onSubmit = (e) => {
        const newReview = {
            stars: rating,
            review: review
        }
        dispatch(createNewReview(id, newReview))

        return history.push(`/businesses/${id}`)
    }

    const sessionUser = useSelector((state) => state?.session.user);

    if (!sessionUser) return <Redirect to="/login" />

    return (
        <>
            <NavigationBarActive />
            <Paper sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, gap: 3 }}>
                <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Review</Typography>
                <CreateRating {...{ rating, setRating }} />
                <CreateReviewDescription {...{ review, setReview, onSubmit }} />
                <CreateReviewButtons id={id} onSubmit={onSubmit} />
            </Paper>
        </>
    )
}

export default CreateReviewPage;