import React, { useState } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Toaster';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, adminKey })
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user_id', userData.userId);
        notify('Login successful', 'success');
        if (userData.isAdmin) {
          navigate('/admin/view-rides');
        } else {
          navigate('/user/profile');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      notify('Login failed. Please check your credentials and try again.', 'error');
    }
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
            Login
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Admin Key (Optional)"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/signup')}
            fullWidth
            sx={{ mt: 1 }}
          >
            Signup
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/forgot-password')}
            fullWidth
            sx={{ mt: 1 }}
          >
            Forgot Password
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
