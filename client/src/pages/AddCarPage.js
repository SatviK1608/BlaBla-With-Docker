import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, CardActions, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster';

const AddCarPage = () => {
  const [formData, setFormData] = useState({
    carModelName: '',
    capacity: '',
    vehicleNo: '',
    ownerId: localStorage.getItem('user_id')
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCar = async () => {
    try {
      const response = await fetch('http://localhost:5000/cars/create-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify('Car added successfully!', 'success');
        navigate('/your-cars');
      } else {
        throw new Error('Failed to add car');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      notify('Error adding car. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <UserNavbar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Add a New Car</Typography>
            <TextField
              label="Car Model Name"
              name="carModelName"
              value={formData.carModelName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Vehicle Number"
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleAddCar} fullWidth>
              Add Car
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default AddCarPage;
