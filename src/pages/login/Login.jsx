import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

export default function Login() {

const {register,handleSubmit}=useForm();

const loginUser= async(data)=>{
  const response=await axios.post(`http://mytshop.runasp.net/api/Account/Login`,data);
  localStorage.setItem('UserToken', response.data.token);
  console.log(response);
}

  return (
    <Container maxWidth="sm" sx={{ mt: 7 }}>
      <Paper elevation={7} sx={{ p: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
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
          <Link  to={'/forget_password'}>Did you forget your password?</Link>
         
          
        
          
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
           
        </Box>
      </Paper>
    </Container>
  );
}