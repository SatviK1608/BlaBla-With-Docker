import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardContent, CardActions, Button, Typography, TextField, Select, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const RidesPage = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [filters, setFilters] = useState({
    startingPoint: '',
    destinationPoint: '',
    sort: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/rides/view-rides')
      .then(response => response.json())
      .then(data => {
        setRides(data);
        setFilteredRides(data); 
      })
      .catch(error => console.error('Error fetching rides:', error));
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

  const bookRide = (rideId) => {
    const userId = localStorage.getItem('user_id');
    fetch('http://localhost:5000/rides/book-ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rideId, userId })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ride booked:', data);
        notify(data.message, 'success'); 
        navigate('/your-rides');
      })
      .catch(error => {
        console.error('Error booking ride:', error);
        notify('Failed to book ride.', 'error'); 
      });
  };

  return (
    <Container>
      <UserNavbar />
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
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => bookRide(ride.rideId)}>
                    Book Ride
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RidesPage;
