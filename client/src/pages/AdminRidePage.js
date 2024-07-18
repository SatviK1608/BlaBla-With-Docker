import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { Container, Box, Card, CardContent, CardActions, Button, Typography, TextField, Select, MenuItem, Grid } from '@mui/material';
import { notify } from '../components/Toaster'; 

const AdminRidePage = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [filters, setFilters] = useState({
    startingPoint: '',
    destinationPoint: '',
    sort: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/rides/view-all-rides')
      .then(response => response.json())
      .then(data => {
        setRides(data);
        setFilteredRides(data); 
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
        notify('Error fetching rides. Please try again later.', 'error');
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...rides];
    if (filters.startingPoint) {
      filtered = filtered.filter(ride => ride.startingPoint.toLowerCase().includes(filters.startingPoint.toLowerCase()));
    }
    if (filters.destinationPoint) {
      filtered = filtered.filter(ride => ride.destinationPoint.toLowerCase().includes(filters.destinationPoint.toLowerCase()));
    }
    if (filters.sort) {
      if (filters.sort === 'priceAsc') {
        filtered.sort((a, b) => a.fare - b.fare);
      } else if (filters.sort === 'priceDesc') {
        filtered.sort((a, b) => b.fare - a.fare);
      }
    }
    setFilteredRides(filtered);
  };

  const clearFilters = () => {
    setFilters({
      startingPoint: '',
      destinationPoint: '',
      sort: ''
    });
  };

  return (
    <Container>
      <AdminNavbar />
      <TextField
        label="Starting Point"
        name="startingPoint"
        value={filters.startingPoint}
        onChange={(e) => setFilters({ ...filters, startingPoint: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Destination Point"
        name="destinationPoint"
        value={filters.destinationPoint}
        onChange={(e) => setFilters({ ...filters, destinationPoint: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
      </Select>
      <Button variant="contained" color="secondary" onClick={clearFilters} style={{ marginLeft: '10px' }}>
        Clear Filters
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {filteredRides.map((ride) => (
          <Grid item xs={12} sm={6} md={4} key={ride.rideId}>
            <Box boxShadow={3} borderRadius={8}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5">{ride.destinationPoint}</Typography>
                  <Typography variant="body2" gutterBottom>Starting Point: {ride.startingPoint}</Typography>
                  <Typography variant="body2" gutterBottom>Price: {ride.fare}</Typography>
                  <Typography variant="body2">Available Seats: {ride.availableSeats}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminRidePage;
