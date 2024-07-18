import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardActions, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { notify } from '../components/Toaster'; 

const YourRidesPage = () => {
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRide = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:5000/rides/view-your-ride/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setRide(data[0]); // Assuming you only want to display the first ride
            notify('Ride fetched successfully', 'success'); 
          } else {
            notify('No rides found', 'info');
          }
        } else {
          throw new Error('Failed to fetch rides');
        }
      } catch (error) {
        console.error('Error fetching rides:', error);
        notify('Failed to fetch rides', 'error'); 
      }
    };

    fetchUserRide();
  }, []);

  const cancelRide = (rideId) => {
    fetch(`http://localhost:5000/rides/cancel-ride/${rideId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: localStorage.getItem('user_id') })
    })
      .then(response => response.json())
      .then(() => {
        setRide(null); // Remove the ride from state after cancellation
        notify('Ride canceled successfully', 'success'); 
      })
      .catch(error => {
        console.error('Error canceling ride:', error);
        notify('Failed to cancel ride', 'error'); 
      });
  };

  const deleteRide = (rideId) => {
    fetch(`http://localhost:5000/rides/delete-ride/${rideId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setRide(null); // Remove the ride from state after deletion
        notify('Ride deleted successfully', 'success'); 
      })
      .catch(error => {
        console.error('Error deleting ride:', error);
        notify('Failed to delete ride', 'error'); 
      });
  };

  const completeRide = (rideId) => {
    fetch(`http://localhost:5000/rides/complete-ride/${rideId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => {
        setRide(null); // Remove the ride from state after completion
        notify('Ride completed successfully', 'success'); 
      })
      .catch(error => {
        console.error('Error completing ride:', error);
        notify('Failed to complete ride', 'error'); 
      });
  };

  return (
    <Container>
      <UserNavbar />
      {ride==null && <Typography variant="h5" gutterBottom>You have no booked rides</Typography>}
      {ride && (
        <Card sx={{ margin: '20px 0', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {ride.destinationPoint}
            </Typography>
            <Divider sx={{ marginBottom: 1 }} />
            <Typography variant="body2" gutterBottom>
              Starting Point: {ride.startingPoint}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Price: {ride.fare}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Available Seats: {ride.availableSeats}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            {!ride.isOwner && (
              <Button variant="contained" color="secondary" onClick={() => cancelRide(ride.rideId)}>
                Cancel Ride
              </Button>
            )}
            {ride.isOwner && (
              <>
                <Button variant="contained" color="primary" onClick={() => navigate(`/update-ride/${ride.rideId}`)}>
                  Update Ride
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteRide(ride.rideId)}>
                  Delete Ride
                </Button>
                <Button variant="contained" color="success" onClick={() => completeRide(ride.rideId)}>
                  Complete Ride
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default YourRidesPage;
