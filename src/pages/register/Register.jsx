import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {

const {register,handleSubmit}=useForm();

const registerUser= async(data)=>{
  const response=await axios.post(`http://mytshop.runasp.net/api/Account/register`,data);
  console.log(response);
}

  return (
    <Container maxWidth="sm" sx={{ mt: 7 }}>
      <Paper elevation={7} sx={{ p: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        
        <Box onSubmit={handleSubmit(registerUser)}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
            {...register('firstName')}
              fullWidth
              label="First Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              {...register('lastName')}
              label="Last Name"
              variant="outlined"
              required
            />
          </Box>
          
          <TextField
            fullWidth
             {...register('userName')}
            label="User Name"
            variant="outlined"
            required
          />
          
          <TextField
            fullWidth
            {...register('email')}
            label="Email"
            type="email"
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
             {...register('confirmPassword')}
            label="Confirm Password"
            type="password"
            variant="outlined"
            required
          />
          
          <TextField
            fullWidth
             {...register('birthOfDate')}
            label="Birth Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
          />
          
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            type="submit"
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}