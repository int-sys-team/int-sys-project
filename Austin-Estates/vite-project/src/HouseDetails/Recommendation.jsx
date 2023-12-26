import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import RentalCard from '../HouseDashboard/RentalCard';
import { Recommend } from '@mui/icons-material';

const Recommendation = (props) => {
  const { _id, description, homeType, homeImage, liked, rareFind, title, hasCooling, hasHeating, hasSpa, numOfBedrooms, numOfBathrooms, livingAreaSqFt, parkingSpaces, price, city, streetAddress } = props.property;

  const [similarHouses, setSimilarHouses] = useState([]);

  const fetchSimilarProperties = async (targetPropertyId) => {
    console.log(targetPropertyId)
    try {
      const response = await fetch('http://localhost:5000/similar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: targetPropertyId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.houses)
      setSimilarHouses(data.houses);
    } catch (error) {
      console.error('Error fetching similar properties:', error.message);
    }
  };

  useEffect(() => {
    // Koristi _id trenutne nekretnine kao targetPropertyId
    fetchSimilarProperties(_id);
  }, [_id]); // Dodaj _id kao zavisnost, tako da će useEffect ponoviti poziv kada se promeni _id

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
      }}
    >
      <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'left' }}>
        AI-Powered recommendations for you
      </Typography>

      <Grid container spacing={2}>
        {similarHouses.map((house) => (
          <Grid item sm={12} md={4} key={house._id}>
            <RentalCard  key={house._id} {...house} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recommendation;
