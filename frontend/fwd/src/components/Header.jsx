import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Urban Company Clone</Typography>
        <TextField label="Search services" variant="outlined" size="small" />
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;