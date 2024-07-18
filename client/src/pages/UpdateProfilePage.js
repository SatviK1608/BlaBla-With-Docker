import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:5000/users/profile/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData({
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNo: userData.phoneNo
          });
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        notify('Failed to fetch user profile', 'error'); 
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const id = localStorage.getItem('user_id');
      const response = await fetch(`http://localhost:5000/users/update-profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify('Profile updated successfully', 'success'); 
        navigate('/profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      notify('Failed to update profile', 'error'); 
    }
  };

  return (
    <Container maxWidth="sm">
      <UserNavbar />
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Update Profile
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
            style={{ marginTop: 20 }}
          >
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateProfilePage;
