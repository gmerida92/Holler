import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography, Grid } from '@mui/material';

function AmenitiesMore({ id }) {

    const businessAttributes = useSelector((state) => state?.singleAttribute[id])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: 'solid', borderColor: 'lightgray' }}>
            <Box>
                <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>Amenities and More</Typography>
            </Box>

            <Grid sx={{ mb: 4 }} container spacing={2} columns={2}>
                {Object?.keys(businessAttributes)?.map((key) => {
                    if (key !== "id" && key !== "business_id" && key !== "created_at" && key !== "price_range" && key !== "updated_at") {
                        if (businessAttributes[key] !== null) {
                            return (
                                <Grid item xs={1} >
                                    <Box><Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{key.split("_").join(" ")}</Typography></Box>
                                </Grid>
                            )
                        }
                    }
                })}

            </Grid>
            {/* <Box sx={{ mb: 4 }}>

                <Typography sx={{ fontSize: '16px' }}>Test</Typography>
            </Box> */}
        </Box>
    )
}

export default AmenitiesMore;