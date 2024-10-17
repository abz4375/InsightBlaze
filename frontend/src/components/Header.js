import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar 
      position="static" 
      style={{
        backdropFilter: 'blur(10px)',  // Frosted glass effect
        backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Light transparent white
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  // Soft shadow
        borderRadius: '12px',  // Rounded corners
        border: '1px solid rgba(255, 255, 255, 0.3)',  // Subtle border for glassmorphism
        margin: '10px',  // Adds spacing around the header
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          style={{ 
            color: 'rgba(0, 0, 0, 0.8)',  // Dark text for contrast
            fontWeight: 'bold',
          }}
        >
          InsightBlaze Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
