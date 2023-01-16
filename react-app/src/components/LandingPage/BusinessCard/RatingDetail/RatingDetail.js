import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography, Rating } from "@mui/material";

function RatingDetail({ business }) {
    return (
        <Box sx={{ mb: 1.5, display: "flex", alignItems: 'center', color: 'gray' }}>
            <Rating name="read-only" value={business.stars} precision={0.5} readOnly />
            <Typography sx={{ ml: 1 }}>{business.review_count}</Typography>
        </Box>
    )


}

export default RatingDetail;