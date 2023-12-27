// Hero.jsx

import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const Hero = (props) => {
  const { _id, description, homeType, homeImage, liked, rareFind, title, hasCooling, hasHeating, hasSpa, numOfBedrooms, numOfBathrooms, livingAreaSqFt, parkingSpaces, price, city, streetAddress } = props.property;


  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        minHeight: '600px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={6} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
            {title? title: "Nije fetchovan title"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {description}
          </Typography>
          <Button variant="contained" color="primary" sx={{ width: '250px', fontSize: '18px' }}>
            Contact this seller
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={homeImage} alt="My Team" sx={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );

};

export default Hero;
