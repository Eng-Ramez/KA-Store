import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, IconButton, Grid, Box, Button
} from '@mui/material';
import { Add, Remove, Delete, DeleteSweep } from '@mui/icons-material';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem('UserToken');

  const getProductFromCart = async () => {
    try {
      const response = await axios.get(`http://mytshop.runasp.net/api/Carts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cartResponse || []);
      setTotalPrice(response.data.totalPrice || 0);
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getProductFromCart();
    } catch (error) {
      console.error('❌ Error increasing quantity:', error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getProductFromCart();
    } catch (error) {
      console.error('❌ Error decreasing quantity:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://mytshop.runasp.net/api/Carts/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getProductFromCart();
    } catch (error) {
      console.error('❌ Error deleting item:', error);
    }
  };

  const clearCart = async () => {
    try {
  
      const deletePromises = cartItems.map(item =>
        axios.delete(`http://mytshop.runasp.net/api/Carts/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      await Promise.all(deletePromises);
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
    }
  };

  useEffect(() => {
    getProductFromCart();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={clearCart}
          startIcon={<DeleteSweep />}
          sx={{ mb: 3 }}
        >
          CLEAR ALL
        </Button>
      )}

      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">
                  Price: ${item.price}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <IconButton onClick={() => decreaseQuantity(item.id)} color="primary">
                    <Remove />
                  </IconButton>
                  <Typography>{item.count}</Typography>

                  <IconButton onClick={() => increaseQuantity(item.id)} color="primary">
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => deleteItem(item.id)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6">💰 Total: ${totalPrice}</Typography>
      </Box>
    </Box>
  );
}
