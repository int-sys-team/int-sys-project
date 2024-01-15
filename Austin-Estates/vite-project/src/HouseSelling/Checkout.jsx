import React, { useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropertyAddressForm from './PropertyAddressForm';
import PropertyDetailsForm from './PropertyDetailsForm';
import PropertyReview from './PropertyReview';
import PropertyDescriptionForm from './PropertyDescriptionForm';

import PropertyContext from '../context/PropertyContext';
import { UserContext } from '../context/UserContext';
import { addProperty } from '../api/properties';

const steps = ['Address', 'Details', 'Description', 'PropertyReview'];

function StepContainer({ step }) {
	switch (step) {
		case 0:
			return <PropertyAddressForm />;
		case 1:
			return <PropertyDetailsForm />;
		case 2:
			return <PropertyDescriptionForm />;
		case 3:
			return <PropertyReview />;
		default:
			throw new Error('Unknown step');
	}
}

const NextBackButtons = ({ activeStep, onBack, onNext }) => (
	<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
		{activeStep !== 0 && (
			<Button onClick={onBack} sx={{ mt: 3, ml: 1 }}>
				Back
			</Button>
		)}

		<Button variant="contained" onClick={onNext} sx={{ mt: 3, ml: 1 }}>
			{activeStep === steps.length - 1 ? 'Submit property' : 'Next'}
		</Button>
	</Box>
);

const defaultProperty = {
	zipcode: '',
	latitude: '',
	longitude: '',
	hasCooling: false,
	hasGarage: false,
	hasHeating: false,
	hasView: false,
	parkingSpaces: '',
	yearBuilt: '',
	numOfPhotos: '1',
	lotSizeSqFt: '',
	livingAreaSqFt: '',
	numOfSchools: '',
	numOfBathrooms: '',
	numOfBedrooms: '',
	numOfStories: '',
};

export default function Checkout() {
	const [propertyData, setPropertyData] = useState(defaultProperty);
	const [activeStep, setActiveStep] = React.useState(0);

	const { user } = useContext(UserContext);

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			// submit property
			const property = {};
			Object.keys(propertyData).map((key) => {
				property[key] = Number(propertyData[key]);
			});
			property['description'] = propertyData['description'];
			property['homeImage'] = propertyData['imageLink'];
			property['userId'] = user.userData.id;
			console.log(property);
			addProperty(property,user.token).then((res) => {
				setActiveStep(activeStep + 1);
			});
      return;
		}
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<PropertyContext.Provider value={{ propertyData, setPropertyData }}>
			<>
				<CssBaseline />
				{/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar> */}
				<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
					<Paper
						variant="outlined"
						sx={{ my: { xs: 0, md: 0 }, p: { xs: 2, md: 3 } }}
					>
						<Typography component="h1" variant="h4" align="center">
							Property Checkout
						</Typography>
						<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your property submission.
								</Typography>
								<Typography variant="subtitle1">
									Your property ID is #2001539. We have
									received your property submission, and will
									update our catalog when your property has
									been PropertyReviewed.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								<StepContainer step={activeStep} />
								<NextBackButtons
									activeStep={activeStep}
									onBack={handleBack}
									onNext={handleNext}
								/>
							</React.Fragment>
						)}
					</Paper>
				</Container>
			</>
		</PropertyContext.Provider>
	);
}
