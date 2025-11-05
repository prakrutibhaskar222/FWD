import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function BookingForm() {
  const [formData, setFormData] = useState({ date: '', time: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to API
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Date" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
      <TextField label="Time" type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
      <TextField label="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
      <Button type="submit" variant="contained">Confirm Booking</Button>
    </Box>
  );
}

export default BookingForm;