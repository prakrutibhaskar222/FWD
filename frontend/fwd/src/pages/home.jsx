import React from 'react';
import { Container, Typography } from '@mui/material';
import ServiceCategories from '../components/ServiceCategories.jsx';

function Home() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Urban Company Clone
      </Typography>
      <Typography variant="body1" gutterBottom>
        Book home services like cleaning, plumbing, and more.
      </Typography>
      <ServiceCategories />
    </Container>
  );
}

export default Home;