import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Box, Paper, Typography, Button, Rating } from '@mui/material';

function CreateRating({ rating, setRating }) {

    return (
        <Box>
            <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                sx={{ fontSize: 45 }}
            />
        </Box>
    )
}

export default CreateRating;