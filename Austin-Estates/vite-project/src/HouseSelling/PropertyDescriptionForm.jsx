import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import PropertyContext from '../context/PropertyContext';

export default function PropertyDescriptionForm() {
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');

  const { propertyData, setPropertyData } = useContext(PropertyContext);

  const handleFieldChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  const generateDescription = () => {
    // Here you can call your AI function to generate a description
    setDescription('Generated description...');
  };

  const generatePrice = () => {
    // Here you can call your AI function to generate a price
    setPrice('Generated price...');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Property Description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="imageLink"
            name="imageLink"
            label="Image Link"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="propertyTitle"
            name="propertyTitle"
            label="Property Title"
            fullWidth
            variant="standard"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={description}
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="price"
            name="price"
            label="Price"
            value={price}
            fullWidth
            variant="outlined"
            onChange={handleFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Our AI will generate the description">
            <Button variant="contained" color="primary" onClick={generateDescription}>
              Generate Description
            </Button>
          </Tooltip>
          <Tooltip title="Our AI will generate the price" style={{marginLeft: '10px'}}>
            <Button variant="contained" color="primary" onClick={generatePrice}>
              Generate Price
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}