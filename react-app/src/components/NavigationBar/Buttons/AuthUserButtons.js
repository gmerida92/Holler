import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, MenuItem, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function AuthUserButton() {

    return (
        <>
            <Button component={Link} to='/login' sx={{ marginRight: 1, my: 2, background: 'white', color: 'black', fontWeight: 'bold', display: 'block' }}>Login</Button>
            <Button component={Link} to='/sign-up' sx={{ marginRight: 1, my: 2, background: '#f55d98', color: 'white', fontWeight: 'bold', display: 'block' }}>Sign Up</Button>
        </>
    )
}

export default AuthUserButton;
