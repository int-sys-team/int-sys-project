import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Hero from "./Hero";
import Section from "./Section";
import Testimonial from "./Testimonial";
import AboutUs from "./AboutUs";

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

export default function Blog() {
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  console.log(location) //ajde probaj da ne printas 500 puta ovo nego sam jednom a???
  // MRZIM REACT
 
  if (!location) {
    console.log("Property is null");
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <div>Loading...</div>
        </Container>
      </ThemeProvider>
    );
  }

  const { _id, description, category, homeImage, liked, rareFind, title, hasCooling, hasHeating, hasSpa, numOfBedrooms, numOfBathrooms, livingAreaSqFt, parkingSpaces, price, city, streetAddress } = location.state;


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <>
          <Hero />
          <Section />
          <AboutUs />
          <Testimonial />

        </>
      </Container>
    </ThemeProvider>
  );
}
