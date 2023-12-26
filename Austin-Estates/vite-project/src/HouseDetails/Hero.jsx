// Hero.jsx

import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import house from "../../public/house-price-predict.jpg";

const Hero = () => {
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
          <Typography variant="h3" fontWeight={700}>
            Let's scale your business
          </Typography>
          <Typography variant="h6">
            Hire professionals who will help your business make 10X your
            previous income. With over 5 years of experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
          <Button variant="contained" color="primary" sx={{ width: '200px', fontSize: '16px' }}>
            HIRE US
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={house} alt="My Team" sx={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
