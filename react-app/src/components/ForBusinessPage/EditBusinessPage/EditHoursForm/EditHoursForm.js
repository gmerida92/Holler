import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function convertTimeStringToObject(timeString) {
    let newDateTimeObject = new Date();
    let timeStringSplit = timeString.split(":");
    newDateTimeObject.setHours(timeStringSplit[0]);
    newDateTimeObject.setMinutes(timeStringSplit[1]);
    newDateTimeObject.setSeconds(timeStringSplit[2]);

    return newDateTimeObject;
}

function EditHoursForm({ businessHour, schedule, setSchedule, mondayOpen, setMondayOpen, mondayClose, setMondayClose,
    tuesdayOpen, setTuesdayOpen, tuesdayClose, setTuesdayClose, wednesdayOpen, setWednesdayOpen, wednesdayClose, setWednesdayClose,
    thursdayOpen, setThursdayOpen, thursdayClose, setThursdayClose, fridayOpen, setFridayOpen, fridayClose, setFridayClose, saturdayOpen,
    setSaturdayOpen, saturdayClose, setSaturdayClose, sundayOpen, setSundayOpen, sundayClose, setSundayClose }) {


    useEffect(() => {

        if (businessHour?.length > 0) {
            let currentSchedule = {};

            businessHour?.forEach((hour) => {
                currentSchedule[hour.day] = {}
                currentSchedule[hour.day]['id'] = hour.id
                currentSchedule[hour.day]['openTime'] = convertTimeStringToObject(hour.open_time)


                currentSchedule[hour.day]['closeTime'] = convertTimeStringToObject(hour.close_time)

            })


            setSchedule(currentSchedule)



            setMondayOpen(currentSchedule["Monday"]["openTime"])
            setMondayClose(currentSchedule["Monday"]["closeTime"])
            setTuesdayOpen(currentSchedule["Tuesday"]["openTime"])
            setTuesdayClose(currentSchedule["Tuesday"]["closeTime"])
            setWednesdayOpen(currentSchedule["Wednesday"]["openTime"])
            setWednesdayClose(currentSchedule["Wednesday"]["closeTime"])
            setThursdayOpen(currentSchedule["Thursday"]["openTime"])
            setThursdayClose(currentSchedule["Thursday"]["closeTime"])
            setFridayOpen(currentSchedule["Friday"]["openTime"])
            setFridayClose(currentSchedule["Friday"]["closeTime"])
            setSaturdayOpen(currentSchedule["Saturday"]["openTime"])
            setSaturdayClose(currentSchedule["Saturday"]["closeTime"])
            setSundayOpen(currentSchedule["Sunday"]["openTime"])
            setSundayClose(currentSchedule["Sunday"]["closeTime"])
        }

    }, [businessHour])

    const handleOnChange = (value, dayOfWeek, statusTime) => {
        const updateState = { ...schedule };
        Object.keys(updateState).forEach((day) => {
            updateState[day] = { ...schedule[day] }
        })
        updateState[dayOfWeek][statusTime] = value;


        setSchedule(updateState)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Edit Hours of Operation</Typography>
            <Grid container spacing={2} >


                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Monday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                name='Monday'
                                label="Monday Open Time"
                                value={mondayOpen || null}
                                onChange={(newValue) => {
                                    setMondayOpen(newValue);
                                    handleOnChange(newValue, "Monday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Monday Close Time"
                                value={mondayClose || null}
                                onChange={(newValue) => {
                                    setMondayClose(newValue);
                                    handleOnChange(newValue, "Monday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Tuesday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Tuesday Open Time"
                                value={tuesdayOpen || null}
                                onChange={(newValue) => {
                                    setTuesdayOpen(newValue);
                                    handleOnChange(newValue, "Tuesday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Tuesday Close Time"
                                value={tuesdayClose || null}
                                onChange={(newValue) => {
                                    setTuesdayClose(newValue);
                                    handleOnChange(newValue, "Tuesday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Wednesday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Wednesday Open Time"
                                value={wednesdayOpen || null}
                                onChange={(newValue) => {
                                    setWednesdayOpen(newValue);
                                    handleOnChange(newValue, "Wednesday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Wednesday Close Time"
                                value={wednesdayClose || null}
                                onChange={(newValue) => {
                                    setWednesdayClose(newValue);
                                    handleOnChange(newValue, "Wednesday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Thursday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Thursday Open Time"
                                value={thursdayOpen || null}
                                onChange={(newValue) => {
                                    setThursdayOpen(newValue);
                                    handleOnChange(newValue, "Thursday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Thursday Close Time"
                                value={thursdayClose || null}
                                onChange={(newValue) => {
                                    setThursdayClose(newValue);
                                    handleOnChange(newValue, "Thursday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Friday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Friday Open Time"
                                value={fridayOpen || null}
                                onChange={(newValue) => {
                                    setFridayOpen(newValue);
                                    handleOnChange(newValue, "Friday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Friday Close Time"
                                value={fridayClose || null}
                                onChange={(newValue) => {
                                    setFridayClose(newValue);
                                    handleOnChange(newValue, "Friday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Saturday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Saturday Open Time"
                                value={saturdayOpen || null}
                                onChange={(newValue) => {
                                    setSaturdayOpen(newValue);
                                    handleOnChange(newValue, "Saturday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Saturday Close Time"
                                value={saturdayClose || null}
                                onChange={(newValue) => {
                                    setSaturdayClose(newValue);
                                    handleOnChange(newValue, "Saturday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Sunday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Sunday Open Time"
                                value={sundayOpen || null}
                                onChange={(newValue) => {
                                    setSundayOpen(newValue);
                                    handleOnChange(newValue, "Sunday", "openTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Sunday Close Time"
                                value={sundayClose || null}
                                onChange={(newValue) => {
                                    setSundayClose(newValue);
                                    handleOnChange(newValue, "Sunday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', paddingTop: 5 }} xs={12}>
                    <Button component={Link} to={'/profile'} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Cancel</Button>
                    {/* <Button type='submit' onClick={onSubmit} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Update Business</Button> */}
                </Grid>
            </Grid>
        </Box >
    )
}

export default EditHoursForm;