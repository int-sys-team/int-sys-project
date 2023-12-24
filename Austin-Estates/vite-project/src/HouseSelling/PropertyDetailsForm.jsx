import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import PropertyContext from '../context/PropertyContext';

export default function PropertyDetailsForm() {
  const { propertyData, setPropertyData } = useContext(PropertyContext);

  const handleFieldChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Real Estate details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="lotSizeSquareFt"
            name="lotSizeSquareFt"
            label="Lot Size Square Feet"
            fullWidth
            variant="filled"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="livingAreaSqFt"
            name="livingAreaSqFt"
            label="Living Area Square Feet"
            fullWidth
            variant="filled"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="hasGarage"
            name="hasGarage"
            label="Has garage?"
            helperText="Type yes or no"
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="hasView"
            name="hasView"
            label="Has view?"
            helperText="Type yes or no"
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="hasCooling"
            name="hasCooling"
            label="Has cooling?"
            helperText="Type yes or no"
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="hasHeating"
            name="hasHeating"
            label="Has heating?"
            helperText="Type yes or no"
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="numOfBedrooms"
            name="numOfBedrooms"
            type="number"
            label="Number of bedrooms"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
            inputProps={{ min: "0" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="numOfBathrooms"
            name="numOfBathrooms"
            label="Number of bathrooms"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
            inputProps={{ min: "0" }}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="numOfParkingSpaces"
            name="numOfParkingSpaces"
            label="How many parking spaces"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
            inputProps={{ min: "0" }}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="yearBuilt"
            name="yearBuilt"
            label="What year it has been built"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
            inputProps={{ min: "0" }}

          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="agreeTerms" value="yes" />}
            label="I agree to the Terms and Conditions"
          />
        </Grid> */}
      </Grid>
    </>
  );
}
