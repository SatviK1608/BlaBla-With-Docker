import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const UpdateRidePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    startingPoint: '',
    destinationPoint: '',
    fare: '',
    availableSeats: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rides/get-ride/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ride details');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching ride:', error);
        notify('Failed to fetch ride details', 'error'); 
      }
    };

    fetchRideDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateRide = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rides/update-ride/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify('Ride updated successfully', 'success'); 
        navigate('/your-rides');
      } else {
        throw new Error('Failed to update ride');
      }
    } catch (error) {
      console.error('Error updating ride:', error);
      notify('Failed to update ride', 'error'); 
    }
  };

  return (
    <Container>
      <UserNavbar/>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Update Ride
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
          <Button variant="contained" color="primary" onClick={handleUpdateRide} fullWidth style={{ marginTop: 20 }}>
            Update Ride
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateRidePage;
