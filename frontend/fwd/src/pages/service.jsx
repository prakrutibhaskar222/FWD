import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ServiceList from '../components/ServiceList.jsx';
import ServiceDetail from '../components/ServiceDetail.jsx';

function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Mock data; replace with axios.get('/api/services')
    setServices([
      { id: 1, name: 'House Cleaning', price: '$50', description: 'Deep cleaning service.' },
      { id: 2, name: 'Plumbing Repair', price: '$80', description: 'Fix leaks and pipes.' },
    ]);
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ServiceList services={services} onSelect={setSelectedService} />
        </Grid>
        <Grid item xs={12} md={6}>
          {selectedService && <ServiceDetail service={selectedService} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Services;