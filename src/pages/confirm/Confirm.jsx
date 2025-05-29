import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

export default function Confirm() {

const {register,handleSubmit}=useForm();

const loginUser= async(data)=>{
  const response=await axios.patch(`http://mytshop.runasp.net/api/Account/SendCode`,data);
  console.log(response);
}

  return (
    <Container maxWidth="sm" sx={{ mt: 7 }}>
      <Paper elevation={7} sx={{ p: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Change Password
        </Typography>
        
        <Box onSubmit={handleSubmit(loginUser)}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
         <TextField
            fullWidth
            {...register('email')}
            label="Email"
            value={localStorage.getItem('email')}
            type="text"
            variant="outlined"
            required
          />
          
           <TextField
            fullWidth
            {...register('code')}
            label="Code"
            type="password"
            variant="outlined"
            required
          />

           <TextField
            fullWidth
            {...register('password')}
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          
          <TextField
            fullWidth
            {...register('ConfirmPassword')}
            label="New Password"
            type="password"
            variant="outlined"
            required
          />
         
         
          
        
          
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            type="submit"
          >
            Save Change
          </Button>
           
        </Box>
      </Paper>
    </Container>
  );
}