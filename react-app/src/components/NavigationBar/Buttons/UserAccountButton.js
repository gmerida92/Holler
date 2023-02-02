import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../../store/session';

import { IconButton, MenuItem, Menu } from '@mui/material';
// import { AppBar, Toolbar, Box, Typography, Button, IconButton, MenuItem, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function UserAccountButton() {
    const dispatch = useDispatch()
    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickProfile = async (e) => {
        setAnchorEl(null);
        return <Redirect to="/profile" />
    };

    const handleClose = async (e) => {
        setAnchorEl(null);
    };

    const handleCloseLogout = async (e) => {
        await dispatch(logout());
        setAnchorEl(null);
    };


    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle sx={{ height: 50, width: 50 }} />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserAccountButton;
