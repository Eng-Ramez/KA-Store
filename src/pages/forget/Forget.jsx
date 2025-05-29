import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

export default function Forget() {

const {register,handleSubmit}=useForm();
const navigate=useNavigate();

const Forgetpassword= async(data)=>{
  const response=await axios.post(`http://mytshop.runasp.net/api/Account/ForgotPassword`,data);
  navigate('/confirmcode')
  localStorage.setItem('email', data.email);
  console.log(response);

}


  return (
    <Container maxWidth="sm" sx={{ mt: 7 }}>
      <Paper elevation={7} sx={{ p: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        
        <Box onSubmit={handleSubmit(Forgetpassword)}
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
          
         
         
          
        
          
          <Button
            
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            type="submit"
          >
            Send Code
          </Button>
           
        </Box>
      </Paper>
    </Container>
  );
}