import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function checkAttributeStatus(attributeStatus) {
    if (attributeStatus !== undefined && attributeStatus === true) {
        return (
            <>
                <CheckIcon sx={{ fontSize: '16px', fontWeight: 'bold', color: "green" }} />
            </>
        )
    }
    else if (attributeStatus !== undefined && attributeStatus === false) {
        return (
            <>
                <CloseIcon sx={{ fontSize: '16px', fontWeight: 'bold', color: "red" }} />

            </>
        )
    }
    else { return '' }
}



function AmenitiesMore({ id }) {

    const businessAttributes = useSelector((state) => state?.singleAttribute[id]) || ''

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: 'solid', borderColor: 'lightgray' }}>
            <Box>
                <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>Amenities and More</Typography>
            </Box>

            <Grid sx={{ mb: 4 }} container spacing={2} columns={2}>
                {businessAttributes['health_score'] && <Grid item xs={1} >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Health Score</Typography>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{businessAttributes['health_score']}</Typography>
                    </Box>
                </Grid>}

                {Object?.keys(businessAttributes)?.map((key) => {
                    if (key === 'health_score') { }
                    if (key !== "id" && key !== "business_id" && key !== "created_at" && key !== "price_range" && key !== "updated_at" && key !== 'health_score') {
                        if (businessAttributes[key] !== null) {
                            return (
                                <Grid item xs={1} >
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                        {checkAttributeStatus(businessAttributes[key])}
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{key?.split("_")?.map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</Typography>
                                    </Box>
                                </Grid>
                            )
                        }
                    }
                })}

            </Grid>
        </Box>
    )
}

export default AmenitiesMore;