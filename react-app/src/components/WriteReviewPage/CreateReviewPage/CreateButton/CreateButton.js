import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Box, Paper, Typography, Button } from '@mui/material';

function CreateReviewButtons({ id, onSubmit }) {
    return (
        <Box sx={{display:'flex', flexDirection:'row', gap: 3}}>
            <Button component={Link} to={`/businesses/${id}`} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Cancel</Button>
            <Button type='submit' onClick={onSubmit} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Create Review</Button>
        </Box>
    )
}

export default CreateReviewButtons;