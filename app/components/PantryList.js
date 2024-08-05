import React from 'react';
import { Box, Card, Typography, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const PantryList = ({ items, onDelete, onIncrement, onDecrement }) => {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} key={item.id}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, borderRadius: 2, boxShadow: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{item.name}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                )}
              </Box>
              <Box>
                <IconButton onClick={() => onIncrement(item.id)} color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => onDecrement(item.id)} color="primary">
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(item.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default PantryList;
