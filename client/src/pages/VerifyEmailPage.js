import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster'; 

const VerifyEmailPage = () => {
  const [formData, setFormData] = useState({
    email: JSON.parse(localStorage.getItem('email')),
    verificationCode: '',
    newPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        notify('Verification successful. Password set.', 'success');
        navigate('/login');
      } else {
        throw new Error('Failed to verify code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      notify('Failed to verify code', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Verify Email and Set Password
        </Typography>
      </Box>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled
        variant="outlined"
      />
      <TextField
        label="Verification Code"
        name="verificationCode"
        value={formData.verificationCode}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        type="password"
        label="New Password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Verify and Set Password
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
