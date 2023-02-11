import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// function convertTimeObjectToString(dateTimeObject) {
//     const timeString = dateTimeObject.toTimeString();
//     const onlyTimeString = timeString.slice(0, 8);
//     return onlyTimeString;
// }

// function convertTimeStringToObject(timeString) {
//     let newDateTimeObject = new Date();
//     let timeString = timeString.split(":");
//     newDateTimeObject.setHours(timeString[0]);
//     newDateTimeObject.setMinutes(timeString[1]);
//     newDateTimeObject.setSeconds(timeString[2]);

//     return newDateTimeObject;
// }

function HoursForm({ prevStep, onSubmit, errors, setErrors, schedule, setSchedule, mondayOpen, setMondayOpen, mondayClose, setMondayClose,
    tuesdayOpen, setTuesdayOpen, tuesdayClose, setTuesdayClose, wednesdayOpen, setWednesdayOpen, wednesdayClose, setWednesdayClose,
    thursdayOpen, setThursdayOpen, thursdayClose, setThursdayClose, fridayOpen, setFridayOpen, fridayClose, setFridayClose, saturdayOpen,
    setSaturdayOpen, saturdayClose, setSaturdayClose, sundayOpen, setSundayOpen, sundayClose, setSundayClose }) {

    const handleOnChange = (value, dayOfWeek, statusTime) => {
        const updateState = { ...schedule };
        Object.keys(updateState).forEach((day) => {
            updateState[day] = { ...schedule[day] }
        })
        updateState[dayOfWeek][statusTime] = value;
        setSchedule(updateState)
    }

    const validateAndSubmit = async (e, submitForm) => {
        if (
            mondayOpen == null || mondayOpen === " "
            ||
            mondayClose == null || mondayClose === " "
            ||
            tuesdayOpen == null || tuesdayOpen === " "
            ||
            tuesdayClose == null || tuesdayClose === " "
            ||
            wednesdayOpen == null || wednesdayOpen === " "
            ||
            wednesdayClose == null || wednesdayClose === " "
            ||
            thursdayOpen == null || thursdayOpen === " "
            ||
            thursdayClose == null || thursdayClose === " "
            ||
            fridayOpen == null || fridayOpen === " "
            ||
            fridayClose == null || fridayClose === " "
            ||
            saturdayOpen == null || saturdayOpen === " "
            ||
            saturdayClose == null || saturdayClose === " "
            ||
            sundayOpen == null || sundayOpen === " "
            ||
            sundayClose == null || sundayClose === " "
        ) {
            setErrors(['Business Hours of Operation : All Fields Required'])
            return e.preventDefault()
        }

        setErrors([])
        submitForm(e)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Add Hours of Operation</Typography>
            {errors.length > 0 && <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {errors.map((error) => {
                    return (
                        <Box component="li" sx={{ color: 'red' }}>
                            <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                        </Box>
                    )
                })}
            </Box>}
            <Grid container spacing={2} >


                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Monday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                name='Monday'
                                label="Monday Open Time"
                                value={mondayOpen}
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
                                value={mondayClose}
                                onChange={(newValue) => {
                                    setMondayClose(newValue);
                                    handleOnChange(newValue, "Monday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Tuesday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Tuesday Open Time"
                                value={tuesdayOpen}
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
                                value={tuesdayClose}
                                onChange={(newValue) => {
                                    setTuesdayClose(newValue);
                                    handleOnChange(newValue, "Tuesday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Wednesday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Wednesday Open Time"
                                value={wednesdayOpen}
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
                                value={wednesdayClose}
                                onChange={(newValue) => {
                                    setWednesdayClose(newValue);
                                    handleOnChange(newValue, "Wednesday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Thursday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Thursday Open Time"
                                value={thursdayOpen}
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
                                value={thursdayClose}
                                onChange={(newValue) => {
                                    setThursdayClose(newValue);
                                    handleOnChange(newValue, "Thursday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Friday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Friday Open Time"
                                value={fridayOpen}
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
                                value={fridayClose}
                                onChange={(newValue) => {
                                    setFridayClose(newValue);
                                    handleOnChange(newValue, "Friday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Saturday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Saturday Open Time"
                                value={saturdayOpen}
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
                                value={saturdayClose}
                                onChange={(newValue) => {
                                    setSaturdayClose(newValue);
                                    handleOnChange(newValue, "Saturday", "closeTime");
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Grid item xs={1.5}>
                        <Typography variant='h6' sx={{ display: 'flex', fontWeight: 'bold' }}>Sunday</Typography>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Sunday Open Time"
                                value={sundayOpen}
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
                                value={sundayClose}
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
                    <Button onClick={prevStep} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Back</Button>
                    {/* <Button onClick={nextStep}  variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Continue</Button> */}
                    <Button type='submit' onClick={(e) => validateAndSubmit(e, onSubmit)} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Create Business</Button>
                </Grid>
            </Grid>
        </Box >
    )
}

export default HoursForm;