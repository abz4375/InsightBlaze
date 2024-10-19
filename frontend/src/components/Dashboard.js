import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filters from './Filters';
import Chart from './Chart';

import { Card, CardContent, CardActions, IconButton } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';


// // Create a custom theme
// const theme = createTheme({
//   typography: {
//     fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
//     h4: {
//       fontWeight: 700,
//       letterSpacing: '0.02em',
//     },
//     h6: {
//       fontWeight: 600,
//       letterSpacing: '0.01em',
//     },
//     button: {
//       textTransform: 'none',
//       fontWeight: 500,
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.6,
//     },
//     body2: {
//       fontSize: '0.875rem',
//       lineHeight: 1.5,
//     },
//   },
// });

function Dashboard() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentChartType, setCurrentChartType] = useState('bar');
  const [topics, setTopics] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    endYear: '',
    topics: ['market'],
    region: '',
    pest: 'Political',
    source: '',
    // swot: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);

      // Extract unique values for filter options
      setTopics([...new Set(response.data.flatMap(item => item.topic || []))]);
      setRegions([...new Set(response.data.map(item => item.region))]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = data.filter(item => (
      (filters.search === '' || item.title.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.dateFrom === '' || new Date(item.published) >= new Date(filters.dateFrom)) &&
      (filters.dateTo === '' || new Date(item.published) <= new Date(filters.dateTo)) &&
      (filters.endYear === '' || item.end_year === parseInt(filters.endYear)) &&
      (filters.topics.length === 0 || filters.topics.some(topic => item.topic.includes(topic))) &&
      (filters.region === '' || item.region === filters.region)
    ));

    setFilteredData(filtered);
  }, [data, filters]);

  const clearFilters = () => {
    setFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
      endYear: '',
      topics: [],
      region: '',
      pest: '',
      source: '',
      // swot: '',
    });
  };

  const handleChartTypeChange = (event, newValue) => {
    setCurrentChartType(newValue);
  };

  // Updated color scheme
  const colorScheme = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.background.default,
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    paperBackground: theme.palette.background.paper,
    accent: theme.palette.secondary.main,
    chartBackground: theme.palette.mode === 'light' ? '#e0f2fe' : '#1e293b',
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };

  return (
    // <Container maxWidth="xl" style={{ padding: '0px', backgroundColor: colorScheme.secondary }}>
    // <ThemeProvider theme={theme}>
      <Container maxWidth="xl" style={{ padding: '0px', backgroundColor: colorScheme.secondary }}>
        {/* <Typography variant="h4" gutterBottom style={{ color: colorScheme.primary, marginBottom: '4px', marginTop:'-10px' }}>
          Dashboard
          </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} style={{ 
              padding: '24px', 
              backgroundColor: colorScheme.paperBackground,
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <Typography variant="h6" style={{ color: colorScheme.primary, marginBottom: '20px', fontWeight:'bold' }}>Filters</Typography>
              <Filters 
                filters={filters} 
                setFilters={setFilters} 
                topics={topics}
                regions={regions}
                clearFilters={clearFilters}
                />
            </Paper>
            <Paper elevation={3} style={{ 
              padding: '24px', 
              marginTop: '10px', 
              backgroundColor: colorScheme.paperBackground,
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
  <Typography variant="h6" style={{ color: colorScheme.primary, marginBottom: '20px' }}>Filtered Data <span style={{opacity:'40%', fontWeight:'normal'}}>(Top 8 Results)</span></Typography>
  <Carousel>
    {filteredData.slice(0, 8).map((item, index) => (
      <Card key={index} style={{ height: '150px', display: 'flex', flexDirection: 'column', backgroundColor:colorScheme.chartBackground }}>
        <CardContent>
          <Typography variant="h6" style={{opacity:'50%'}}>{item.region}</Typography>
          <Typography variant="body2" style={{fontWeight:'bold'}}>
            {item.title.length > 100 ? item.title.substring(0, 100) + '...' : item.title}
          </Typography>
        </CardContent>
        <CardActions style={{ marginTop: 'auto' }}>
  <Tooltip title="Click to open source" arrow>
    <IconButton 
      size="small" 
      onClick={() => window.open(item.url, '_blank')}
      style={{ margin: 'auto', color: 'blue' }}
    >
      <OpenInNewIcon />
    </IconButton>
  </Tooltip>
</CardActions>

      </Card>
    ))}
  </Carousel>
  <Button 
    variant="contained" 
    onClick={fetchData} 
    style={{ 
      marginTop: '20px', 
      backgroundColor: colorScheme.primary, 
      color: '#fff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '10px 20px',
      fontSize: '1rem',
      fontWeight: 500,
    }}
    >
    Refresh Data
  </Button>
</Paper>

          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={3} style={{ 
              padding: '24px', 
              height: '100%', 
              backgroundColor: colorScheme.paperBackground,
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <Typography variant="h6" style={{ color: colorScheme.primary, marginBottom: '20px', fontWeight:'bold' }}> Insights</Typography>
              <Tabs 
                value={currentChartType} 
                onChange={handleChartTypeChange} 
                centered
                textColor="primary"
                indicatorColor="primary"
                style={{ marginBottom: '20px' }}
                >
                {['Bar', 'Line', 'Pie', 'Bubble', 'Scatter', 'Heatmap', 'Timeline'].map((type) => (
                  <Tab 
                  key={type} 
                  label={type} 
                  value={type.toLowerCase()} 
                  style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 500,
                    textTransform: 'none',
                  }} 
                  />
                ))}
              </Tabs>
              <div style={{ 
                backgroundColor: colorScheme.chartBackground, 
                borderRadius: '12px', 
                padding: '20px',
              }}>
                <Chart data={filteredData} chartType={currentChartType} theme={theme} style={{margin:'auto'}}/>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    // </ThemeProvider>
    //             </Container>
  );
}

export default Dashboard;