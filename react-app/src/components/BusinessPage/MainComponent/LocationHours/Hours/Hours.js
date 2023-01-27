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

function convertOpenTimeStringToObject(timeString) {
    let todayDateObject = new Date();
    let timeStringSplit = timeString.split(':');
    let timeObject = new Date(todayDateObject.getFullYear(), todayDateObject.getMonth(), todayDateObject.getDate(), parseInt(timeStringSplit[0]), parseInt(timeStringSplit[1]), parseInt(timeStringSplit[2]));
    return timeObject;
}

function convertCloseTimeStringToObject(timeString) {
    let todayDateObject = new Date();
    let timeStringSplit = timeString.split(':');
    let timeObject = new Date(todayDateObject.getFullYear(), todayDateObject.getMonth(), todayDateObject.getDate(), parseInt(timeStringSplit[0]), parseInt(timeStringSplit[1]), parseInt(timeStringSplit[2]));
    return timeObject;
}

function checkOpenStatus(scheduleToCheck) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDateObject = new Date();
    let currentDay = days[currentDateObject.getDay()];


    let status = false

    // let opensAt = scheduleToCheck.open_time;
    // let opens = opensAt.split(':');
    // let openTime = new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate(), parseInt(opens[0]), parseInt(opens[1]), parseInt(opens[2]));

    // let closesAt = scheduleToCheck.close_time;
    // let closes = closesAt.split(':');
    // let closesTime = parseInt(closes[0]) < parseInt(opens[0]) ? new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate() + 1, parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2])) : new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate(), parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2]));

    // let storeHours = businessHours[i];
    // let openTime = convertOpenTimeStringToObject(dayHours.open_time);
    // let closeTime = convertTimeStringToObject(dayHours.close_time);

    // if (scheduleToCheck.day === currentDay) {
    //     if (currentDateObject >= openTime && currentDateObject <= closesTime) {
    //         status = true;
    //     }
    // }

    for (let i = 0; i < scheduleToCheck.length; i++) {
        let storeHours = scheduleToCheck[i];
        // let openTime = convertTimeStringToObject(storeHours.open_time);
        // let closeTime = convertTimeStringToObject(storeHours.close_time);

        let opensAt = storeHours.open_time;
        let opens = opensAt.split(':');
        let openTime = new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate(), parseInt(opens[0]), parseInt(opens[1]), parseInt(opens[2]));

        let closesAt = storeHours.close_time;
        let closes = closesAt.split(':');
        let closesTime = parseInt(closes[0]) < parseInt(opens[0]) ? new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate() + 1, parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2])) : new Date(currentDateObject.getFullYear(), currentDateObject.getMonth(), currentDateObject.getDate(), parseInt(closes[0]), parseInt(closes[1]), parseInt(closes[2]));


        if (storeHours.day === currentDay) {
            if (currentDateObject >= openTime && currentDateObject <= closesTime) {
                status = true;
            }
        }
    }

    return status
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

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDateObject = new Date();
    let currentDay = days[currentDateObject.getDay()];


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

                        {/* {currentDay === hoursArray[0]?.day ? <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{`${checkOpenStatus(hoursArray)}`}</Typography> : <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>&nbsp;</Typography>} */}

                    </Box>)
                })}
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                {restructuredHours.map((hoursArray) => {
                    return (
                        <Box>
                            {hoursArray.map((schedule, index) => {

                                if (schedule.day === currentDay) {

                                    if (hoursArray.length > 1) {
                                        if (index === 0) {
                                            return (<Box>
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: checkOpenStatus(hoursArray) ? 'green' : 'red' }}>{`${checkOpenStatus(hoursArray) ? 'Open Now' : 'Closed Now'}`}</Typography>
                                            </Box>)
                                        }
                                        return (<Box>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>&nbsp;</Typography>
                                        </Box>)
                                    }

                                    return (<Box>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: checkOpenStatus(new Array({ ...schedule })) ? 'green' : 'red' }}>{`${checkOpenStatus(new Array({ ...schedule })) ? 'Open Now' : 'Closed Now'}`}</Typography>
                                    </Box>)

                                }

                                return (<Box>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>&nbsp;</Typography>
                                </Box>)
                            })}
                        </Box>
                    )
                })}

            </Box>
        </Box >
    )
}

export default Hours;
