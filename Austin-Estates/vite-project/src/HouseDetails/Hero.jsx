// Hero.jsx

import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { Balance } from '@mui/icons-material';
import { useCompareProperties } from '../hooks/useCompareProperties';

const Hero = (props) => {
	const {
		_id,
		description,
		homeType,
		homeImage,
		liked,
		rareFind,
		title,
		hasCooling,
		hasHeating,
		hasSpa,
		numOfBedrooms,
		numOfBathrooms,
		livingAreaSqFt,
		parkingSpaces,
		price,
		city,
		streetAddress,
	} = props.property;

	const { properties, compareProperties } = useCompareProperties();

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
			<Grid
				container
				spacing={6}
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Grid item xs={12} md={7}>
					<Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
						{title ? title : 'Nije fetchovan title'}
					</Typography>
					<Typography variant="h6" sx={{ mb: 3 }}>
						{description}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{ width: '250px', fontSize: '18px' }}
						xs={6}
					>
						Contact this seller
					</Button>
					<Button
						variant={
							properties
								.map((property) => property._id)
								.includes(_id)
								? 'contained'
								: properties.length >= 3
								? 'disabled'
								: 'outlined'
						}
						color="primary"
						xs={6}
						startIcon={<Balance />}
						sx={{ ml: 3, fontSize: '18px' }}
						onClick={() => compareProperties(props.property)}
					>
						Compare
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
