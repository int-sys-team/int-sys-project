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

  const handleCheckboxChange = (event) => {
    // TODO OBAVEZNO - kad se submituje da se true false prebaci u yes/no
    // ne moze ovde jer nece da se sacuvaju uneti podaci
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.checked,
    });
    console.log(propertyData);
  }

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
					<FormControlLabel
						control={
							<Checkbox
								id="hasGarage"
								name="hasGarage"
								onChange={handleCheckboxChange}
							/>
						}
						label="Has Garage"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Checkbox
								id="hasView"
								name="hasView"
								onChange={handleCheckboxChange}
							/>
						}
						label="Has View"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Checkbox
								id="hasCooling"
								name="hasCooling"
								onChange={handleCheckboxChange}
							/>
						}
						label="Has Cooling"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Checkbox
								id="hasHeating"
								name="hasHeating"
								onChange={handleCheckboxChange}
							/>
						}
						label="Has Heating"
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
						inputProps={{ min: '0' }}
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
						inputProps={{ min: '0' }}
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
						inputProps={{ min: '0' }}
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
						inputProps={{ min: '0' }}
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
