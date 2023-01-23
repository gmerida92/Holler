import { Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/system';

function convert24to12String(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // If time format correct
    if (time.length > 1) {
        time = time.slice(1, 4);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function convertTimeStringToObject(timeString) {
    let todayDateObject = new Date();
    let timeStringSplit = timeString.split(':');
    let timeObject = new Date(todayDateObject.getFullYear(), todayDateObject.getMonth(), todayDateObject.getDate(), parseInt(timeStringSplit[0]), parseInt(timeStringSplit[1]), parseInt(timeStringSplit[2]));
    return timeObject;
}

function checkOpenStatus(todayDateObject, todayDay, hours) {
    for (let i = 0; i < hours.length; i++) {
        let scheduleToCheck = hours[i];

        if (scheduleToCheck.day !== todayDay) {
            continue
        }

        let openTime = convertTimeStringToObject(scheduleToCheck.open_time);
        let closeTime = convertTimeStringToObject(scheduleToCheck.close_time);

        if (todayDateObject >= openTime && todayDateObject <= closeTime) {
            return 'Open'
        }
    }
    return 'Closed'
}

function todayStoreHours(todayDay, hours) {
    let storeHoursString = ''
    for (let i = 0; i < hours.length; i++) {
        let scheduleToCheck = hours[i];

        if (scheduleToCheck.day !== todayDay) {
            continue
        }

        let openTime = convert24to12String(scheduleToCheck.open_time);
        let closeTime = convert24to12String(scheduleToCheck.close_time);

        if (i < hours.length - 1) {
            storeHoursString = storeHoursString + openTime + " - " + closeTime + ", "
        }
        else {
            storeHoursString = storeHoursString + openTime + " - " + closeTime
        }
    }
    return storeHoursString
}

function BusinessHoursSubheader({ id }) {
    const businessHours = useSelector((state) => state?.singleBusinessHour[id]) || ''

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentTime = new Date();
    let nextDayIndex = currentTime.getDay() < 6 ? currentTime.getDay() + 1 : 0;
    let currentDay = days[currentTime.getDay()];
    let nextDay = days[nextDayIndex];

    const businessStatus = checkOpenStatus(currentTime, currentDay, businessHours);
    const storeHours = todayStoreHours(currentDay, businessHours)

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ fontWeight: 'bold', color: `${businessStatus === 'Open' ? 'green' : 'red'}` }}>{`${businessStatus}`}</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{storeHours}</Typography>
        </Box>
    )
}

export default BusinessHoursSubheader;