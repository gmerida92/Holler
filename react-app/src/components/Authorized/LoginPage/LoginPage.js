import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

import NavigationBarNonActive from '../../NavigationBar/NavigationBarNonActive';
import DemoUserButton from '../Buttons/DemoUserButton';

import { Box, TextField, Toolbar, Button, AppBar, Typography, FormControl, InputLabel, FormGroup, Grid, Paper, Card } from '@mui/material';


function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
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

      <form onSubmit={onLogin}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={12} sx={{ padding: '30px 50px', width: '50%', margin: '20px auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant='h4'>Login</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <TextField type='email' value={credential} onChange={updateCredential} label='Email' placeholder='Enter an Email' variant='outlined' fullWidth required />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <TextField type='password' value={password} onChange={updatePassword} label='Password' placeholder='Enter a Password' variant='outlined' fullWidth required />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
              <Button sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold', mr: 1 }} type='submit' variant='contained' >Login</Button>
              <DemoUserButton />
            </Box>
          </Paper>
        </Box>
      </form>
    </>
  )

  // return (
  //   <form onSubmit={onLogin}>
  //     <div>
  //       {errors.map((error, ind) => (
  //         <div key={ind}>{error}</div>
  //       ))}
  //     </div>
  //     <div>
  //       <label htmlFor='email'>Email</label>
  //       <input
  //         name='email'
  //         type='text'
  //         placeholder='Email'
  //         value={email}
  //         onChange={updateEmail}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor='password'>Password</label>
  //       <input
  //         name='password'
  //         type='password'
  //         placeholder='Password'
  //         value={password}
  //         onChange={updatePassword}
  //       />
  //       <button type='submit'>Login</button>
  //     </div>
  //   </form>
  // );
};

export default LoginPage;
