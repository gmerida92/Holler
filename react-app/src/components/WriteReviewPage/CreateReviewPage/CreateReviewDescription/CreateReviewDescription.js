import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Box, Paper, Typography, Button, TextField } from '@mui/material';

function CreateReviewDescription({ review, setReview }) {

    return (
        <Box sx={{ width: '50%' }}>
            <TextField
                label="Your Review"
                multiline
                rows={10}
                size='large'
                value={review}
                onChange={(event) => setReview(event.target.value)}
                fullWidth
            />
        </Box>
    )
}
export default CreateReviewDescription;