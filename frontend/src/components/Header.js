import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          InsightBlaze Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
