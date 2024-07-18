import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showVerificationFields, setShowVerificationFields] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        localStorage.setItem('email', JSON.stringify(email));
        setShowVerificationFields(true);
      } else {
        throw new Error('Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      notify('Failed to send verification email', 'error');
    }
  };

  const handleVerificationSubmit = async () => {
    const formData = {
      email: JSON.parse(localStorage.getItem('email')),
      verificationCode,
      newPassword
    };

    try {
      const response = await fetch('http://localhost:5000/users/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify('Password reset successful! Please login with your new password.', 'success');
        navigate('/login');
      } else {
        throw new Error('Failed to verify code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      notify('Failed to verify code. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        disabled={showVerificationFields} // Disable if verification fields are shown
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEmailSubmit}
        fullWidth
      >
        Verify Email
      </Button>
      
      {showVerificationFields && (
        <Box mt={2}>
          <TextField
            label="Verification Code"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerificationSubmit}
            fullWidth
          >
            Verify and Set Password
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ForgotPasswordPage;
