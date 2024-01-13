import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import PropertyContext from '../context/PropertyContext';

const toYesNo = (bool) => bool? 'yes' : 'no'

export default function PropertyReview() {
  const { propertyData } = useContext(PropertyContext);

  return (
      <>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Typography variant="h4" gutterBottom style={{ 
              fontSize: '2rem', 
              padding: '10px', 
              borderRadius: '3px', 
              textAlign: 'center',
              background: 'linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)', // gradient from light blue to dark blue
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // shadow with a light blue color
              color: 'white',
            }}>
            Summary
          </Typography>
      </Slide>  
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Typography gutterBottom>Longitude: {propertyData.longitude}</Typography>
            <Typography gutterBottom>Latitude: {propertyData.latitude}</Typography>
            <Typography gutterBottom>Address: {propertyData.address}</Typography>
            <Typography gutterBottom>City: {propertyData.city}</Typography>
            <Typography gutterBottom>State: {propertyData.state}</Typography>
            <Typography gutterBottom>Zip: {propertyData.zip}</Typography>
            <Typography gutterBottom>Country: {propertyData.country}</Typography>
          </Paper>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Property description
            </Typography>
            <Typography gutterBottom>Image Link: {propertyData.imageLink}</Typography>
            <Typography gutterBottom>Property Title: {propertyData.propertyTitle}</Typography>
            <Typography gutterBottom>Description: {propertyData.description}</Typography>
            <Typography gutterBottom>Price: {propertyData.price}</Typography>
          </Paper>
          <Paper style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
              Property details
            </Typography>
            <Typography gutterBottom>Lot Size Square Feet: {propertyData.lotSizeSquareFt}</Typography>
            <Typography gutterBottom>Living Area Square Feet: {propertyData.livingAreaSqFt}</Typography>
            <Typography gutterBottom>Has garage? {toYesNo(propertyData.hasGarage)}</Typography>
            <Typography gutterBottom>Has view? {toYesNo(propertyData.hasView)}</Typography>
            <Typography gutterBottom>Has cooling? {toYesNo(propertyData.hasCooling)}</Typography>
            <Typography gutterBottom>Has heating? {toYesNo(propertyData.hasHeating)}</Typography>
            <Typography gutterBottom>Number of bedrooms: {propertyData.numOfBedrooms}</Typography>
            <Typography gutterBottom>Number of bathrooms: {propertyData.numOfBathrooms}</Typography>
            <Typography gutterBottom>Number of parking spaces: {propertyData.numOfParkingSpaces}</Typography>
            <Typography gutterBottom>Year built: {propertyData.yearBuilt}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
