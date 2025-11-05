import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

function ServiceCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories').then(response => setCategories(response.data));
  }, []);

  return (
    <Grid container spacing={2}>
      {categories.map(cat => (
        <Grid item xs={12} sm={6} md={4} key={cat.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{cat.name}</Typography>
              <Typography>{cat.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ServiceCategories;