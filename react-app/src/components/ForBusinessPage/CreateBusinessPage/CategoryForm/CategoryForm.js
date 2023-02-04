import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function CategoryForm({ prevStep, nextStep, setCategories, inputs, setInputs }) {

    const handleAddInput = () => {
        const inputsNewInput = [...inputs, ['', true]];
        setInputs(inputsNewInput);
    }

    const handleOnChange = (e, index) => {
        const inputsOnChange = [...inputs];
        inputs[index][0] = e.target.value;
        setInputs(inputsOnChange);
    }

    const handleDelete = (e, index) => {
        const inputsRemoveInput = [...inputs];
        inputsRemoveInput.splice(index, 1)
        setInputs(inputsRemoveInput)
    }

    useEffect(() => {
        // let counter = 0;

        // for (let index = 0; index < inputs.length; index++) {
        //     if (inputs[index][1]) {
        //         counter++;
        //     }
        // }

        // if (counter === 0) {
        //     const newArray = [];
        //     for (let index = 0; index < inputs.length; index++) {
        //         newArray.push(inputs[index][0])
        //     }
        //     setCategories(newArray)
        // } else {
        //     setCategories([]);
        // }

        const newArray = []
        for (let index = 0; index < inputs?.length; index++) {
            newArray.push(inputs[index][0])
        }
        setCategories(newArray)

    }, [inputs])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Categories to Your Business</Typography>
            <Grid container spacing={2}>
                {inputs?.map((input, index) => {
                    return (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                type='text'
                                variant='outlined'
                                label='Category'
                                value={input[0]}
                                onChange={(e) => handleOnChange(e, index)}
                            />
                            <Button onClick={(e) => handleDelete(e, index)}><ClearOutlinedIcon /></Button>
                        </Grid>
                    )
                })}
                <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', paddingTop: 5 }} xs={12}>
                    <Button onClick={handleAddInput} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Add Category</Button>
                    <Button onClick={prevStep} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Back</Button>
                    <Button onClick={nextStep} type='submit' variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Continue</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CategoryForm;