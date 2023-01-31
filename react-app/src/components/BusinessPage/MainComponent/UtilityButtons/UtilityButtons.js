import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function UtilityButtons({ id }) {

    return (
        <Box sx={{ borderBottom: 'solid', borderColor: 'lightgray' }}>
            <Button sx={{ mb: 4, background: '#f55d98', display: 'flex', alignItems:'center', gap:0.5 }} variant="contained">
                <StarBorderOutlinedIcon />
                <Typography sx={{color: 'white', fontWeight: 'bold',}}>Write a Review</Typography>
            </Button>
        </Box>
    )
}

export default UtilityButtons;