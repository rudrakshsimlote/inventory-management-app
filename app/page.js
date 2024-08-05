'use client';

import { useState, useEffect } from "react"; 
import { Box, Typography, Button, Modal, Container, CircularProgress, TextField, IconButton, Card, CardContent, CardActions, Tooltip } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon, Delete as DeleteIcon, Add as IncrementIcon, Remove as DecrementIcon } from '@mui/icons-material';
import { collection, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import PantryList from "@/app/components/PantryList";
import PantryForm from "@/app/components/PantryForm";
import ImageUpload from "@/app/components/ImageUpload"; 
import '@fontsource/roboto';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateInventory = async () => {
    const q = query(collection(firestore, 'inventory'));
    const docsSnapshot = await getDocs(q);
    const inventoryList = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
    setLoading(false);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'inventory', id));
    setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
    setFilteredInventory(prevFilteredInventory => prevFilteredInventory.filter(item => item.id !== id));
  };

  const handleIncrementQuantity = async (id) => {
    const itemRef = doc(firestore, 'inventory', id);
    const itemSnapshot = await getDoc(itemRef);
    if (itemSnapshot.exists()) {
      const currentQuantity = itemSnapshot.data().quantity;
      const newQuantity = currentQuantity + 1;
      setInventory(prevInventory => 
        prevInventory.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
      );
      await updateDoc(itemRef, { quantity: newQuantity });
      updateInventory();
    }
  };

  const handleDecrementQuantity = async (id) => {
    const itemRef = doc(firestore, 'inventory', id);
    const itemSnapshot = await getDoc(itemRef);
    if (itemSnapshot.exists()) {
      const currentQuantity = itemSnapshot.data().quantity;
      if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        setInventory(prevInventory => 
          prevInventory.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
        await updateDoc(itemRef, { quantity: newQuantity });
        updateInventory();
      }
    }
  };

  const handleSearch = (query) => {
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, fontFamily: 'Roboto' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom color="primary" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>Inventory Management</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen} sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          Add New Item
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box p={4} bgcolor="background.paper" borderRadius={2} boxShadow={24} mx="auto" mt={10} maxWidth="sm">
          <PantryForm updateInventory={updateInventory} onClose={handleClose} />
        </Box>
      </Modal>
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <TextField 
          variant="outlined" 
          placeholder="Search Items" 
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon />
            ),
          }}
          sx={{ width: '100%', maxWidth: 500 }}
        />
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>Inventory Items</Typography>
        <Box display="grid" gridTemplateColumns="1fr" gap={2}>
          {filteredInventory.map(item => (
            <Card key={item.id} sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
                {item.imageUrl && (
                  <Box mt={2}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Tooltip title="Increase Quantity">
                  <IconButton onClick={() => handleIncrementQuantity(item.id)}>
                    <IncrementIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Decrease Quantity">
                  <IconButton onClick={() => handleDecrementQuantity(item.id)}>
                    <DecrementIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Item">
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <Box mt={4}>
        <ImageUpload updateInventory={updateInventory} />
      </Box>
    </Container>
  );
}
