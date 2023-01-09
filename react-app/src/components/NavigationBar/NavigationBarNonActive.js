import React from 'react';
import {Link } from 'react-router-dom';


import { AppBar, Toolbar, Box, Typography, Button, IconButton, MenuItem, Menu } from '@mui/material';

import logo from '../../hoLLer.png'

function NavigationBarNonActive() {
    return (
        <header>
            <AppBar sx={{ background: '#316B83' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: 100, height: 100 }}>
                        <Button component={Link} to='/' sx={{ padding: 0, width: 100, height: 100 }}>
                            <img width={100} height={100} src={logo} alt="logo" />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Toolbar />
        </header>
    )
}

export default NavigationBarNonActive