import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Modal, Box, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ThemeContext } from './ThemeContext';

function Header() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <AppBar 
      position="static" 
      color="default"
      style={{
        backdropFilter: 'blur(100px)',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(135, 206, 235, 0.4)' : 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        margin: 'auto',
        padding: 'auto',
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip title="Click the 'i' button to see the guide to terminology" arrow>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              style={{ 
                color: theme.palette.text.primary,
                // fontWeight: 'bold',
                fontSize: '28px',
                fontFamily:'monospace',
                marginRight: '8px'
              }}
            >
              📈 Insight-Blaze
            </Typography>
            <IconButton onClick={handleOpen} color="inherit" size="small">
              <InfoIcon />
            </IconButton>
          </div>
        </Tooltip>
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
  ...modalStyle,
  width: '600px',
  maxHeight: '80vh',
  overflowY: 'auto'
}}>
  <Typography id="modal-modal-title" variant="h5" component="h2" gutterBottom>
    Data Fields Explained
  </Typography>
  <List>
    {[
      { field: "end_year", desc: "The year when the insight is expected to end" },
      { field: "intensity", desc: "Measure of the impact or severity of the insight (scale: 1-10)" },
      { field: "sector", desc: "The economic sector related to the insight" },
      { field: "topic", desc: "The main subject or theme of the insight" },
      { field: "insight", desc: "Brief description of the key takeaway" },
      { field: "url", desc: "Source link for more information" },
      { field: "region", desc: "Geographical area where the insight is relevant" },
      { field: "start_year", desc: "The year when the insight began or was first observed" },
      { field: "impact", desc: "Description of the potential effects" },
      { field: "added", desc: "Date when the insight was added to the database" },
      { field: "published", desc: "Date when the insight was originally published" },
      { field: "country", desc: "Specific country related to the insight" },
      { field: "relevance", desc: "Importance or applicability of the insight (scale: 1-10)" },
      { field: "pestle", desc: "PEST category (Political, Economic, Social, Technological)" },
      { field: "source", desc: "Organization or entity that provided the insight" },
      { field: "title", desc: "Concise summary of the insight" },
      { field: "likelihood", desc: "Probability of the insight occurring or being accurate (scale: 1-10)" }
    ].map((item, index) => (
      <ListItem key={index} sx={{ py: 0.5 }}>
        <ListItemText 
          primary={<Typography variant="subtitle1" component="span" fontWeight="bold">{item.field}:</Typography>}
          secondary={item.desc}
        />
      </ListItem>
    ))}
  </List>
  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
    Example Data Entry:
  </Typography>
  <pre style={{
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    overflowX: 'auto',
    fontSize: '0.8rem'
  }}>
    {JSON.stringify({
      "end_year": "",
      "intensity": 6,
      "sector": "Energy",
      "topic": "gas",
      "insight": "Annual Energy Outlook",
      "url": "http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf",
      "region": "Northern America",
      "start_year": "",
      "impact": "",
      "added": "January, 20 2017 03:51:25",
      "published": "January, 09 2017 00:00:00",
      "country": "United States of America",
      "relevance": 2,
      "pestle": "Political",
      "source": "EIA",
      "title": "U.S. natural gas consumption is expected to increase during much of the projection period.",
      "likelihood": 3
    }, null, 2)}
  </pre>
</Box>

      </Modal>
    </AppBar>
  );
}

export default Header;
