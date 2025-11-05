import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
function ServiceList({ services }) {
  return (
    <List>
      {services.map(service => (
        <ListItem key={service.id}>
          <ListItemText primary={service.name} secondary={service.price} />
        </ListItem>
      ))}
    </List>
  );
}
