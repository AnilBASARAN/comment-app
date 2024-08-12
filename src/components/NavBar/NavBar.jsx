import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import './NavBar.css';

function Navbar() {
  let userId = 2;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
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
              Comments & Posts
            </Typography>
            <nav>
              <ul className="nav-links">
                <li className='link-item'>
                  <Link to="/" className="link">Home</Link>
                </li>
                <li className='link-item'>
                  <Link to={`/users/${userId}`} className="link">User</Link>
                </li>
                <li className='link-item'>
                  <Link to={`/login`} className="link">LoginMe</Link>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
