import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

import NavigationBarNonActive from '../../NavigationBar/NavigationBarNonActive';

import { Box, TextField, Button, Typography, Paper } from '@mui/material';
// import { Box, TextField, Toolbar, Button, AppBar, Typography, FormControl, InputLabel, FormGroup, Grid, Paper, Card } from '@mui/material';


function SignUpPage() {

  // const [errors, setErrors] = useState([]);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onSignUp = async (e) => {
    e.preventDefault();
    const response = await dispatch(signUp(firstName, lastName, email, password));
    // const data = await dispatch(signUp(firstName, lastName, email, password));
    if (response) {
      setErrors(response)
    }
  };

  const updateFirstName = (e) => {
    setfirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setlastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <NavigationBarNonActive />

      <form onSubmit={onSignUp}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={12} sx={{ padding: '30px 50px', width: '50%', margin: '20px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant='h4'>Sign Up</Typography>
            </Box>
            <Box component="ul" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {errors.length > 0 && errors.map((error) => {
                return (
                  <Box component="li" sx={{ color: 'red' }}>
                    <Typography sx={{ color: 'red' }}>{`${error.split(':')[0].split('_').join(' ')} : ${error.split(':')[1]}`}</Typography>
                  </Box>
                )
              })}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField sx={{ padding: 1 }}
                type='text'
                value={firstName}
                onChange={updateFirstName}
                label='First Name'
                placeholder='Enter First Name'
                variant='outlined'
                fullWidth
                required />
              <TextField sx={{ padding: 1 }}
                type='text'
                value={lastName}
                onChange={updateLastName}
                label='Last Name'
                placeholder='Enter Last Name'
                variant='outlined'
                fullWidth
                required />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <TextField
                type='email'
                value={email}
                onChange={updateEmail}
                label='Email'
                placeholder='Enter an Email'
                variant='outlined'
                fullWidth
                required />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <TextField
                type='password'
                value={password}
                onChange={updatePassword}
                label='Password'
                placeholder='Enter a Password'
                variant='outlined'
                fullWidth
                required />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <Button sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }} type='submit' variant='contained' >Sign Up</Button>
            </Box>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default SignUpPage;
