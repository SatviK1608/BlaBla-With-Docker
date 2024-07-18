import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardActions, Button, Typography, Grid, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const YourCarsPage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const ownerId = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:5000/cars/view-your-cars/${ownerId}`);
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          if(data.length>0)
            notify('Cars fetched successfully', 'success'); 
          else
            notify('No cars found', 'info');
        } else {
          throw new Error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        notify('Failed to fetch cars', 'error'); 
      }
    };

    fetchUserCars();
  }, []);

  return (
    <Container>
      <UserNavbar/>
      {cars.length===0 && <Typography variant="h5" gutterBottom>You have no cars added</Typography>}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} key={car.carId}>
            <Box boxShadow={3} borderRadius={8} sx={{ height: '100%' }}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    {car.carModelName}
                  </Typography>
                  <Divider sx={{ marginBottom: 1 }} />
                  <Typography variant="body2" gutterBottom>
                    Capacity: {car.capacity}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Vehicle Number: {car.vehicleNo}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/update-car/${car.carId}`)}>
                    Update Car Details
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/create-ride/${car.carId}`)}>
                    Create Ride
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

export default YourCarsPage;
