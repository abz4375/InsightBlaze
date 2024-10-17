import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import Filters from './Filters';
import Chart from './Chart'; // Import the Chart component

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    dateFrom: '',
    dateTo: '',
    endYear: '',
    topics: [],
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: null,
    city: null
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
      // Extract unique values for filter options
      setTopics([...new Set(response.data.flatMap(item => item.topic || []))]);
      setSectors([...new Set(response.data.map(item => item.sector))]);
      setRegions([...new Set(response.data.map(item => item.region))]);
      setCountries([...new Set(response.data.map(item => item.country))]);
      setCities([...new Set(response.data.map(item => item.city))]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = data.filter(item => {
      return (
        (filters.search === '' || item.title.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.category === '' || item.category === filters.category) &&
        (filters.minPrice === '' || item.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' || item.price <= parseFloat(filters.maxPrice)) &&
        (filters.dateFrom === '' || new Date(item.published) >= new Date(filters.dateFrom)) &&
        (filters.dateTo === '' || new Date(item.published) <= new Date(filters.dateTo)) &&
        (filters.endYear === '' || item.end_year === parseInt(filters.endYear)) &&
        (filters.topics.length === 0 || filters.topics.some(topic => item.topic.includes(topic))) &&
        (filters.sector === '' || item.sector === filters.sector) &&
        (filters.region === '' || item.region === filters.region) &&
        (filters.pest === '' || item.pestle === filters.pest) &&
        (filters.source === '' || item.source.toLowerCase().includes(filters.source.toLowerCase())) &&
        (filters.swot === '' || item.swot === filters.swot) &&
        (filters.country === null || item.country === filters.country) &&
        (filters.city === null || item.city === filters.city)
      );
    });

    setFilteredData(filtered);
  }, [data, filters]);

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: '',
      dateFrom: '',
      dateTo: '',
      endYear: '',
      topics: [],
      sector: '',
      region: '',
      pest: '',
      source: '',
      swot: '',
      country: null,
      city: null
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Filters 
        filters={filters} 
        setFilters={setFilters} 
        topics={topics}
        sectors={sectors}
        regions={regions}
        countries={countries}
        cities={cities}
        clearFilters={clearFilters}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6">Data Preview</Typography>
            <pre>{JSON.stringify(filteredData.slice(0, 5), null, 2)}</pre>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={fetchData}>Refresh Data</Button>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6">Chart</Typography>
            <Chart data={filteredData} /> {/* Pass filteredData to Chart */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
