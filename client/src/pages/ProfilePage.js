import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
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
          const userProfile = await response.json();
          setProfile(userProfile);
          notify('Successfully fetched user profile.', 'success'); 
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        notify('Failed to fetch user profile.', 'error'); 
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <UserNavbar />
      <Card sx={{ mt: 2, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1"><strong>Username:</strong> {profile.username}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
          <Typography variant="body1"><strong>First Name:</strong> {profile.firstName}</Typography>
          <Typography variant="body1"><strong>Last Name:</strong> {profile.lastName}</Typography>
          <Typography variant="body1"><strong>Phone Number:</strong> {profile.phoneNo}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/update-profile')}
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProfilePage;
