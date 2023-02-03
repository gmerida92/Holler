import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { NavLink, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authenticate } from '../../store/session';

import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
// import { AppBar, Toolbar, Box, Typography, Button, IconButton, MenuItem, Menu } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';

import UserAccountButtone from './Buttons/UserAccountButton'
import AuthUserButton from './Buttons/AuthUserButtons';

import logo from '../../hoLLer.png'


function NavigationBarActive() {
  const sessionUser = useSelector((state) => state?.session?.user) || ""

  return (
    <header>
      <AppBar sx={{ background: '#316B83' }}>
        <Toolbar>

          <Box sx={{ ml: 10, width: 100, height: 100, flexGrow: 1 }}>
            <Button component={Link} to='/' sx={{ padding: 0, width: 100, height: 100 }}>
              <img width={100} height={100} src={logo} alt="logo" />
            </Button>
          </Box>

          <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', textAlign: 'center', flexGrow: 0 }}>
            {/* <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <Typography>Write a Review</Typography>
            </Button> */}
            <Button component={Link} to='/business/new' sx={{ my: 2, color: 'white', display: 'block' }}>
              <Typography>For Businesses</Typography>
            </Button>
            {sessionUser ? <UserAccountButtone /> : <AuthUserButton />}
          </Box>

        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
    </header >
  )
}

export default NavigationBarActive;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import FastfoodIcon from '@mui/icons-material/Fastfood';

// const pages = ["For Businesses", 'Write a Review'];
// const settings = ['Profile', 'Account Settings', 'Logout'];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>

//           <FastfoodIcon  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: '-apple-system',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}>
//             Holler
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit">
//               <MenuIcon />

//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <FastfoodIcon  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: '-apple-system',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             Holler
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import BasicMenu from './Buttons/MenuDropdown';
// // import LogoutButton from '../Authorized/LogoutButton';

// function NavigationBar() {
//   return (
//     <header>
//       <nav>
//         <div>Holler</div>
//         <div>
//           <div>For Businesses Button</div>
//           <div>Write a Review Button</div>
//           <BasicMenu />
//           {/* {!sessionuser && (
//             <>
//               <div>Login Button Button</div>
//               <div>Sign Up Button Button</div>
//             </>
//           )}
//           {!sessionuser && (
//             <>
//               <div>Account Button With DropDown</div>
//             </>
//           )} */}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default NavigationBar;
