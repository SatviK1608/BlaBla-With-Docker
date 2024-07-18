import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster';

const UpdateCarPage = () => {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    carModelName: '',
    capacity: '',
    vehicleNo: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cars/get-car-detail/${carId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          throw new Error('Failed to fetch car details');
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        notify('Failed to fetch car details', 'error');
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateCar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cars/update-car/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify('Car updated successfully', 'success'); 
        navigate('/your-cars');
      } else {
        throw new Error('Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      notify('Failed to update car', 'error'); 
    }
  };

  return (
    <Container>
      <UserNavbar />
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Update Car Details
          </Typography>
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
          <Button variant="contained" color="primary" onClick={handleUpdateCar} fullWidth style={{ marginTop: 20 }}>
            Update Car
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateCarPage;
