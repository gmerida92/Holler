import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

import { Box, TextField, Toolbar, Button, AppBar, Typography, FormControl, InputLabel, FormGroup, Grid, Paper, Card } from '@mui/material';

function DemoUserButton() {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demouser@gmail.com', 'password1234'));
        if (data) {
            setErrors(data);
        }
    };

    if (user) {
        return <Redirect to='/' />;
      }

    return (
        <Button onClick={onLogin} sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }} type='submit' variant='contained' >Demo User</Button>
    )
}

export default DemoUserButton;