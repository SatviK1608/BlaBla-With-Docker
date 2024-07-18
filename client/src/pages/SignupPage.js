import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster'; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNo: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/login');
        notify('Signup successful', 'success'); 
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      notify('Signup failed', 'error'); 
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign Up
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
            label="Phone No"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/login')}
            fullWidth
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupPage;
