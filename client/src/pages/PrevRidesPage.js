import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const PrevRidesPage = () => {
  const [prevRides, setPrevRides] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    fetch(`http://localhost:5000/rides/prev-rides/${userId}`)
      .then(response => response.json())
      .then(data => {
        setPrevRides(data);
        notify('Successfully fetched previous rides.', 'success'); 
      })
      .catch(error => {
        console.error('Error fetching previous rides:', error);
        notify('Failed to fetch previous rides.', 'error');
      });
  }, []);

  return (
    <Container>
      <UserNavbar />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {prevRides.map((ride) => (
          <Grid item xs={12} sm={6} key={ride.rideId}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  {ride.destinationPoint}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Starting Point: {ride.startingPoint}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Price: {ride.fare}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PrevRidesPage;
