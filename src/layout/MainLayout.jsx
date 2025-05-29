import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/footer/Footer'
import { Container } from '@mui/material'

export default function MainLayout() {
  return (
    <>
    <Navbar/>
   
    <Container>
    <Outlet/>
    </Container>
   
    <Footer/>
    </>
  )
}
