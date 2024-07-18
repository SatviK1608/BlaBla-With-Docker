import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
        <Button color="inherit" onClick={() => navigate('/your-cars')}>Your Cars</Button>
        <Button color="inherit" onClick={() => navigate('/add-car')}>Add Car</Button>
        <Button color="inherit" onClick={() => navigate('/your-rides')}>Your Rides</Button>
        <Button color="inherit" onClick={() => navigate('/rides')}>Rides</Button>
        <Button color="inherit" onClick={() => navigate('/prev-rides')}>Prev Rides</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
