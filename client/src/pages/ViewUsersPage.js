import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import { notify } from '../components/Toaster'; 

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/view-users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          notify('Users fetched successfully', 'success'); 
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        notify('Failed to fetch users', 'error'); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <AdminNavbar />
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} key={user.userId}>
            <Card sx={{ height: '100%', boxShadow: 4 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Phone: {user.phoneNo}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewUsersPage;
