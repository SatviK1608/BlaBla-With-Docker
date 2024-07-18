import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const CreateRidePage = () => {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    carId,
    startingPoint: '',
    destinationPoint: '',
    fare: '',
    availableSeats: '',
    userId: localStorage.getItem('user_id')
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateRide = async () => {
    try {
      const response = await fetch('http://localhost:5000/rides/create-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/your-rides');
        notify('Ride created successfully!', 'success');
      } else {
        throw new Error('Failed to create ride');
      }
    } catch (error) {
      console.error('Error creating ride:', error);
      notify('Error creating ride. Please try again later.', 'error');
    }
  };

  return (
    <Container>
      <UserNavbar />
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Create Ride
          </Typography>
          <TextField
            label="Starting Point"
            name="startingPoint"
            value={formData.startingPoint}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destination Point"
            name="destinationPoint"
            value={formData.destinationPoint}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fare"
            name="fare"
            value={formData.fare}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Seats"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCreateRide} fullWidth style={{ marginTop: 20 }}>
            Create Ride
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateRidePage;
