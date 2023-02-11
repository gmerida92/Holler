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
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {

        console.log('HEREHERHE', rating, review)

        if(rating === 0 || rating === null){
            setErrors(['Rating : Must be 1 or greater'])
            return e.preventDefault()
        }

        if (review?.trim() == null || review?.trim() == "" || review === " " || review?.length === 0 || review === null) {
            setErrors(['Review : Field Required'])
            return e.preventDefault()
        }

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
                {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {errors.map((error) => {
                        return (
                            <Box component="li" sx={{ color: 'red' }}>
                                <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                            </Box>
                        )
                    })}
                </Box>}
                <CreateRating {...{ rating, setRating }} />
                <CreateReviewDescription {...{ review, setReview, onSubmit }} />
                <CreateReviewButtons id={id} onSubmit={onSubmit} />
            </Paper>
        </>
    )
}

export default CreateReviewPage;