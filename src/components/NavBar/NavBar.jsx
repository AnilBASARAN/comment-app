import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useState } from "react";

import './NavBar.css';

function Navbar(props) {
  const { userName,userId ,createUser,isUserInfo} = props;

  return (
   (createUser) ?  <Box sx={{ flexGrow: 1, width: '100%' }}>  {/* Ensures Navbar takes full width */}
   <AppBar position="static">
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         <MenuIcon />
       </IconButton>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       {userId ? `Welcome ${userName}` : "Welcome to Comments & Posts Application"} 
       </Typography>
       <nav>
         <ul className="nav-links">
         <li className='link-item'>
            
           </li>
           <li className='link-item'>
             {!userName ? <Link to="/" className="link">Home</Link> : null}
           </li>
       
         </ul>
       </nav>
     </Toolbar>
   </AppBar>
 </Box>:
  <Box sx={{ flexGrow: 1, width: '100%' }}>  {/* Ensures Navbar takes full width */}
  <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {userId ? `Welcome ${userName}` : "Welcome to Comments & Posts Application"} 
      </Typography>
      <nav>
        <ul className="nav-links">
        <li className='link-item'>
           
          </li>
          <li className='link-item'>
            {!userName ? <Link to="/" className="link">Home</Link> : null}
          </li>
          <li className='link-item'>
            {!userName ? <Link to="/pagination" className="link">Pagination</Link> : null}
          </li>
          <li className='link-item'>
            {!userName ? <Link to={`/login`} className="link">Log in</Link> :
            isUserInfo ? (<>
               <Link to={`/`} className="link">Log out</Link>
              </>
              ) :(<>
              <Link to={`/users/${userId}/userInfo`} className="link">User Info</Link> <Link to={`/`} className="link">Log out</Link>
              </>
              )}
          </li>
        </ul>
      </nav>
    </Toolbar>
  </AppBar>
</Box>
  );
}

export default Navbar;
