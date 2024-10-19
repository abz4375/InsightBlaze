import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from './ThemeContext';

function Header() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  return (
    <AppBar 
      position="static" 
      color="default"
      style={{
        backdropFilter: 'blur(100px)',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(135, 206, 235, 0.5)' : 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        // borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        margin: 'auto',
        padding:'auto',
        // width:'95vw'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          style={{ 
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            margin:'auto',
            fontSize:'28px'
          }}
        >
          📊 InsightBlaze Dashboard
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
}

export default Header;
