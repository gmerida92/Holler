import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function EditCatgoryForm({ businessCategory, inputs, setInputs }) {


    useEffect(() => {

        if (businessCategory.length > 0) {
            setInputs(businessCategory?.map(categoryObject => [categoryObject?.category_name, categoryObject?.id, true]))
        }

        // const newArray = []
        // for (let index = 0; index < inputs?.length; index++) {
        //     newArray.push([inputs[index][0], inputs[index][1]])
        // }
        // setCategories(newArray)
        

    }, [businessCategory])

    // const handleAddInput = () => {
    //     const inputsNewInput = [...inputs, ['', true]];
    //     setInputs(inputsNewInput);
    // }

    const handleOnChange = (e, index) => {
        const inputsOnChange = [...inputs];

        inputsOnChange[index][0] = e.target.value;
        setInputs(inputsOnChange);
    }

    // const handleDelete = (e, index) => {
    //     const inputsRemoveInput = [...inputs];
    //     inputsRemoveInput.splice(index, 1)
    //     setInputs(inputsRemoveInput)
    // }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', paddingBottom: 5, paddingTop: 5, gap: 3 }}>
            <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Edit Business Categories</Typography>
            <Grid container spacing={2}>
                {inputs.length > 0 && inputs?.map((input, index) => {
                    return (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <TextField
                                type='text'
                                variant='outlined'
                                label='Category'
                                value={input[0]}
                                onChange={(e) => handleOnChange(e, index)}
                                fullWidth
                            />
                            {/* <Button onClick={(e) => handleDelete(e, index)}><ClearOutlinedIcon /></Button> */}
                        </Grid>
                    )
                })}
                <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', paddingTop: 5 }} xs={12}>
                    {/* <Button onClick={handleAddInput} variant="contained" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Add Category</Button> */}
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditCatgoryForm;