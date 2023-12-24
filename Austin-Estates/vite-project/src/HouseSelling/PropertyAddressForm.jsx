import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Chip } from '@mui/material';

import PropertyContext from '../context/PropertyContext';

export default function PropertyAddressForm() {
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
        Property address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            fullWidth
            autoComplete="location-longitude"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
            fullWidth
            autoComplete="location-latitude"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Box mt={2}>
            <Divider>
              <Chip label="OR" />
            </Divider>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Austin"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for contract details"
          />
        </Grid>*/}
      </Grid> 
    </>
  );
}
