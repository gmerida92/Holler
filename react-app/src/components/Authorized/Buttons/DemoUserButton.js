import React from 'react';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

import { Button } from '@mui/material';

function DemoUserButton() {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // const [errors, setErrors] = useState([]);

    const onLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demouser@gmail.com', 'password1234'));
        // const data = await dispatch(login('demouser@gmail.com', 'password1234'));
        // if (data) {
        //     setErrors(data);
        // }
    };

    if (user) {
        return <Redirect to='/' />;
      }

    return (
        <Button onClick={onLogin} sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }} type='submit' variant='contained' >Demo User</Button>
    )
}

export default DemoUserButton;