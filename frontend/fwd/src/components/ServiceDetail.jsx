import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
function ServiceDetail({ service }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{service.name}</Typography>
        <Typography>{service.description}</Typography>
        <Typography>Price: {service.price}</Typography>
        <Button variant="contained">Book Now</Button>
      </CardContent>
    </Card>
  );
}