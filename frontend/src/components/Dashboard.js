import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Filters from './Filters';
import Chart from './Chart';

function Dashboard() {
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
    topics: [],
    region: '',
    pest: '',
    source: '',
    swot: '',
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
      swot: '',
    });
  };

  const handleChartTypeChange = (event, newValue) => {
    setCurrentChartType(newValue);
  };

  const colorScheme = {
    primary: '#3b82f6',
    secondary: '#f3f4f6',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    paperBackground: '#ffffff',
    accent: '#f97316',
    chartBackground: '#e5e7eb',
  };

  return (
    <Container maxWidth="xl" style={{ padding: '20px', backgroundColor: colorScheme.secondary }}>
      <Typography variant="h4" gutterBottom style={{ color: colorScheme.textPrimary }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: colorScheme.paperBackground }}>
            <Typography variant="h6" style={{ color: colorScheme.textPrimary }}>Filters</Typography>
            <Filters 
              filters={filters} 
              setFilters={setFilters} 
              topics={topics}
              regions={regions}
              clearFilters={clearFilters}
            />
          </Paper>
          <Paper elevation={3} style={{ padding: '20px', marginTop: '15px', backgroundColor: colorScheme.paperBackground }}>
            <Typography variant="h6" style={{ color: colorScheme.textPrimary }}>Data Preview</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: colorScheme.textPrimary }} />}>
                <Typography style={{ color: colorScheme.textSecondary }}>View Filtered Data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <pre style={{ color: colorScheme.textPrimary, overflowX: 'scroll', height: '15vh' }}>
                  {JSON.stringify(filteredData.slice(0, 5), null, 2)}
                </pre>
              </AccordionDetails>
            </Accordion>
            <Button 
              variant="contained" 
              onClick={fetchData} 
              style={{ marginTop: '10px', backgroundColor: colorScheme.accent, color: '#fff' }}>
              Refresh Data
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%', backgroundColor: colorScheme.paperBackground }}>
            <Typography variant="h6" style={{ color: colorScheme.textPrimary }}>Chart</Typography>
            <Tabs value={currentChartType} onChange={handleChartTypeChange} centered>
              <Tab label="Bar" value="bar" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Line" value="line" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Pie" value="pie" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Bubble" value="bubble" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Scatter" value="scatter" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Heatmap" value="heatmap" style={{ color: colorScheme.textPrimary }} />
              <Tab label="Timeline" value="timeline" style={{ color: colorScheme.textPrimary }} />
            </Tabs>
            <Chart data={filteredData} chartType={currentChartType} style={{ margin: '10px' }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
