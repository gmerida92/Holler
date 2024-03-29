import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import NavigationBarActive from '../../NavigationBar/NavigationBarActive';
import EditRating from './EditRating/EditRating';
import EditReviewDescription from './EditReviewDescription/EditReviewDescription';
import EditReviewButtons from './EditButton/EditButton';

import { Box, Paper, Typography, Button } from '@mui/material';

import { loadReviewForEdit } from '../../../store/singleBusinessReview';
import { updateAReview } from '../../../store/review';


function EditReviewPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadReviewForEdit(id))
    }, [dispatch])

    const review = useSelector((state) => state?.singleBusinessReview[id]) || ''

    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {

        if (rating === 0 || rating === null) {
            setErrors(['Rating : Must be 1 or greater'])
            return e.preventDefault()
        }

        if (description?.trim() == null || description?.trim() == "" || description === " " || description?.length === 0 || description === null) {
            setErrors(['Review : Field Required'])
            return e.preventDefault()
        }

        const updatedReview = {
            stars: rating,
            review: description
        }
        dispatch(updateAReview(id, updatedReview))

        return history.push(`/profile`)
    }

    const sessionUser = useSelector((state) => state?.session.user);

    if (!sessionUser) return <Redirect to="/login" />

    return (
        <>
            <NavigationBarActive />
            <Paper sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, gap: 3 }}>
                <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Edit Review</Typography>
                {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {errors.map((error) => {
                        return (
                            <Box component="li" sx={{ color: 'red' }}>
                                <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                            </Box>
                        )
                    })}
                </Box>}
                <EditRating {...{ review, rating, setRating }} />
                <EditReviewDescription {...{ review, description, setDescription }} />
                <EditReviewButtons onSubmit={onSubmit} />
            </Paper>
        </>
    )
}

export default EditReviewPage;