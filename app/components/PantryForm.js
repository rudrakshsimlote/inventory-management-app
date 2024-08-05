import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';

const PantryForm = ({ updateInventory, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(firestore, 'inventory'), {
      name: itemName,
      quantity: parseInt(quantity)
    });
    setItemName('');
    setQuantity('');
    updateInventory();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} sx={{ fontFamily: 'Roboto' }}>
      <TextField 
        label="Item Name" 
        value={itemName} 
        onChange={(e) => setItemName(e.target.value)} 
        variant="outlined"
        required
      />
      <TextField 
        label="Quantity" 
        type="number"
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        variant="outlined"
        required
      />
      <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>Add Item</Button>
    </Box>
  );
};

export default PantryForm;
