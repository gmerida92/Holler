import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import { loadAllBusinessHour } from "../../../../store/business_hour";


function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1, 4);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


function findBusinessHoursForTodayAndNext(id, day, nextDay, businessHour) {
    let businessDayHours = [];
    for (let i = 0; i < businessHour.length; i++) {
        let checkBusinessHour = businessHour[i]
        if (checkBusinessHour.business_id === id) {
            if (checkBusinessHour.day === day || checkBusinessHour.day === nextDay) {
                businessDayHours.push(checkBusinessHour)
            }
        }
    }
    return businessDayHours;
}


function isBusinessOpen(day, hoursCurrentBusiness) {

    let currentTimeObject = new Date()

    for (let i = 0; i < hoursCurrentBusiness.length; i++) {


        let currentScheduleCheck = hoursCurrentBusiness[i];

        if (currentScheduleCheck.day !== day) {
            continue
        }

        let openTime = currentScheduleCheck.open_time;
        let closeTime = currentScheduleCheck.close_time;

        let opens = openTime.split(':');
        let opensObject = new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate(), parseInt(opens[0]), parseInt(opens[1]), parseInt(opens[2]));

        let closes = closeTime.split(':');
        let closesObject = parseInt(closes[0]) < parseInt(opens[0]) ? new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate() + 1, parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2])) : new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate(), parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2]));

        if (currentTimeObject >= opensObject && currentTimeObject <= closesObject) {
            return `Open`
        }
    }

    return 'Closed';
}

function timeUntil(status, day, nextDay, todayAndTomorrow) {
    let currentTimeObject = new Date()

    if (status === 'Open') {
        for (let i = 0; i < todayAndTomorrow.length; i++) {
            let currentScheduleCheck = todayAndTomorrow[i];

            if (currentScheduleCheck.day !== day) {
                continue
            }

            let openTime = currentScheduleCheck.open_time;
            let closeTime = currentScheduleCheck.close_time;

            let opens = openTime.split(':');
            let opensObject = new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate(), parseInt(opens[0]), parseInt(opens[1]), parseInt(opens[2]));

            let closes = closeTime.split(':');
            let closesObject = parseInt(closes[0]) < parseInt(opens[0]) ? new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate() + 1, parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2])) : new Date(currentTimeObject.getFullYear(), currentTimeObject.getMonth(), currentTimeObject.getDate(), parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2]));

            if (currentTimeObject >= opensObject && currentTimeObject <= closesObject) {
                return tConvert(closeTime)
            }
        }
    } else if (status === 'Closed') {
        for (let i = 0; i < todayAndTomorrow.length; i++) {
            let currentScheduleCheck = todayAndTomorrow[i];

            if (currentScheduleCheck.day !== nextDay) {
                continue
            }

            let openTime = currentScheduleCheck.open_time;

            return tConvert(openTime);

        }
    }
}


function TimeComponent({ id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllBusinessHour(id))
    }, [dispatch])

    const all_business_hour = useSelector((state) => Object?.values(state?.businessHour)) || ''

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    let nextDayIndex = today.getDay() < 6 ? today.getDay + 1 : 0
    let day = days[today.getDay()]
    let nextDay = days[nextDayIndex]

    const hoursCurrentBusiness = findBusinessHoursForTodayAndNext(id, day, nextDay, all_business_hour);
    const businessStatus = isBusinessOpen(day, hoursCurrentBusiness);
    const untilTime = timeUntil(businessStatus, day, nextDay, hoursCurrentBusiness);

    return (
        <Box sx={{ display: 'flex' }}>
            <Typography variant="body2" sx={{ mr: 0.5, fontWeight: 'bold', color: `${businessStatus === 'Open' ? 'green' : 'red'}` }}>{businessStatus}</Typography>
            <Typography variant="body2">until {untilTime}</Typography>
        </Box>
    )
}
export default TimeComponent;