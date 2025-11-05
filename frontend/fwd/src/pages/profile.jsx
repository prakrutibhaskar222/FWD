import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Profile() {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Mock bookings; replace with axios.get('/api/bookings')
    setBookings([
      { id: 1, service: 'House Cleaning', date: '2023-10-01', status: 'Confirmed' },
      { id: 2, service: 'Plumbing Repair', date: '2023-10-05', status: 'Pending' },
    ]);
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Your Profile
      </Typography>
      <Typography variant="h5">Name: {user.name}</Typography>
      <Typography variant="h5">Email: {user.email}</Typography>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Your Bookings
      </Typography>
      <List>
        {bookings.map(booking => (
          <ListItem key={booking.id}>
            <ListItemText
              primary={`${booking.service} - ${booking.date}`}
              secondary={`Status: ${booking.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Profile;