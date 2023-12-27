import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HotTubIcon from '@mui/icons-material/HotTub';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';


const Section = (props) => {
  const { _id, description, homeType, homeImage, liked, rareFind, title, hasCooling, hasHeating, hasSpa, numOfBedrooms, numOfBathrooms, livingAreaSqFt, parkingSpaces, price, city, streetAddress } = props.property;

  const propertyFeatures = [
    { icon: CategoryIcon, text: homeType, description: 'The category of a property generally refers to its classification based on its usage or purpose' },
    { icon: AcUnitIcon, text: hasCooling ? 'Has Cooling' : 'No Cooling', description: 'This indicates whether the home has a cooling system, such as air conditioning' },
    { icon: HotTubIcon, text: hasSpa ? 'Has Spa' : 'No Spa', description: 'This indicates whether the home includes a spa or hot tub' },
    { icon: HotelIcon, text: `Bedrooms: ${numOfBedrooms}`, description: 'The number of bedrooms in the home' },
    { icon: BathtubIcon, text: `Bathrooms: ${numOfBathrooms}`, description: 'The number of bathrooms in the home' },
    { icon: SquareFootIcon, text: `Living Area: ${livingAreaSqFt} sq ft`, description: 'The total living area of the home' },
    { icon: LocalParkingIcon, text: `Parking Spaces: ${parkingSpaces}`, description: 'The number of parking spaces included with the home.' },
    { icon: AttachMoneyIcon, text: `Price: ${Math.round(price)}$`, description: 'The listing price of the home.' },
    { icon: HomeIcon, text: streetAddress, description: 'The physical street address of the home.' },
  ];
  
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '500px',
      }}>
        {propertyFeatures.map((feature, index) => (
          <Grid
            key={index}
            xs={12}
            md={3.5}
            minHeight={300}
            sx={{
              backgroundColor: '#f2f0f1',
              textAlign: 'center',
              padding: '30px',
              width: '200px',
              borderRadius: '10px',
              margin: '10px !important',
            }}
          >
            <feature.icon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {feature.text}
            </Typography>
            {feature.description}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
