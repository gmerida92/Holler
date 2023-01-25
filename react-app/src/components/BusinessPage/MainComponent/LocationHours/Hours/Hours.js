import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

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

function checkOpenStatus(businessHours) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDateObject = new Date();
    // let nextDayIndex = currentDateObject.getDay() < 6 ? currentDateObject.getDay() + 1 : 0;
    let currentDay = days[currentDateObject.getDay()];
    // let nextDay = days[nextDayIndex];

    let openTime = convertTimeStringToObject(businessHours.open_time);
    let closeTime = convertTimeStringToObject(businessHours.close_time);

    if (businessHours.day === currentDay) {
        if (currentDateObject >= openTime && currentDateObject <= closeTime) {
            return 'Open Now'
        }
    }

    return 'Closed Now'
}

function restructureBusinessHours(hours) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let structuredByDays = [];

    for (let i = 0; i < days.length; i++) {
        let day = days[i]
        let businessHoursGrouped = []

        for (let i = 0; i < hours?.length; i++) {
            let element = hours[i];

            if (element.day === day) {
                businessHoursGrouped.push(element)
            }
        }

        structuredByDays.push(businessHoursGrouped)
    }

    return structuredByDays;
}

function Hours({ id }) {
    const storeHours = useSelector((state) => state?.singleBusinessHour[id])
    let restructuredHours = restructureBusinessHours(storeHours)


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {restructuredHours.map((hoursArray) => {
                    return (<Box>
                        {hoursArray.map((hours, index) => {
                            if (index > 0) {
                                return (
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>&nbsp;</Typography>
                                )
                            }

                            return (
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{`${hours?.day?.slice(0, 3)}`}</Typography>
                            )
                        })}
                    </Box>)
                })}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {restructuredHours.map((hoursArray) => {
                    return (<Box>
                        {hoursArray.map((hours, index) => {
                            return (
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{`${convert24to12String(hours?.open_time)} - ${convert24to12String(hours?.close_time)}`}</Typography>
                            )
                        })}
                    </Box>)
                })}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {restructuredHours.map((hoursArray) => {
                    return (<Box>
                        {hoursArray.map((hours, index) => {
                            // if(checkOpenStatus(hours)){

                            // }
                            return (
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{checkOpenStatus(hours)}</Typography>
                            )
                        })}
                    </Box>)
                })}
            </Box>

        </Box >
    )
}

export default Hours;