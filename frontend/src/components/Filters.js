import React from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";

function Filters({
  filters,
  setFilters,
  topics,
  sectors,
  regions,
  countries,
  cities,
}) {
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const pestOptions = ["Political", "Economic", "Social", "Technological"];
  const swotOptions = ["Strengths", "Weaknesses", "Opportunities", "Threats"];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Date From"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Date To"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={filters.dateTo}
          onChange={(e) => handleFilterChange("dateTo", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="End Year"
          type="number"
          variant="outlined"
          value={filters.endYear}
          onChange={(e) => handleFilterChange("endYear", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Autocomplete
          multiple
          options={topics}
          getOptionLabel={(option) => option.label || option}
          renderInput={(params) => (
            <TextField {...params} label="Topics" variant="outlined" />
          )}
          value={filters.topics}
          onChange={(e, newValue) => handleFilterChange("topics", newValue)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Region</InputLabel>
          <Select
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
            label="Region"
          >
            <MenuItem value="">All</MenuItem>
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>PEST</InputLabel>
          <Select
            value={filters.pest}
            onChange={(e) => handleFilterChange("pest", e.target.value)}
            label="PEST"
          >
            <MenuItem value="">All</MenuItem>
            {pestOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Source"
          variant="outlined"
          value={filters.source}
          onChange={(e) => handleFilterChange("source", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>SWOT</InputLabel>
          <Select
            value={filters.swot}
            onChange={(e) => handleFilterChange("swot", e.target.value)}
            label="SWOT"
          >
            <MenuItem value="">All</MenuItem>
            {swotOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Filters;
