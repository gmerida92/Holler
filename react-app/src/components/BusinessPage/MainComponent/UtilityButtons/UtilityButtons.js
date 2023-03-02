import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function UtilityButtons({ id }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: "row", gap: 1, borderBottom: 'solid', borderColor: 'lightgray' }}>
            <Button component={Link} to={`/review/new/business/${id}`} sx={{ mb: 4, width: '35%', background: '#f55d98', display: 'flex', alignItems: 'center', gap: 0.5 }} variant="contained">
                <StarBorderOutlinedIcon />
                <Typography sx={{ color: 'white', fontWeight: 'bold', }}>Write a Review</Typography>
            </Button>
            <Button component={Link} to={`/image/new/business/${id}`} sx={{ mb: 4, width: '35%', background: '#f55d98', display: 'flex', alignItems: 'center', gap: 0.5 }} variant="contained"><Typography sx={{ color: 'white', fontWeight: 'bold', }}>Add Image</Typography></Button>
        </Box>
    )
}

export default UtilityButtons;