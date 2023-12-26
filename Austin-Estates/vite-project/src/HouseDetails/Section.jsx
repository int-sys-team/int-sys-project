import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import TitleIcon from '@mui/icons-material/Title';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import HotTubIcon from '@mui/icons-material/HotTub';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';


const Section = (props) => {
  const { _id, description, homeType, homeImage, liked, rareFind, title, hasCooling, hasHeating, hasSpa, numOfBedrooms, numOfBathrooms, livingAreaSqFt, parkingSpaces, price, city, streetAddress } = props.property;

  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '500px',
      }}>
      
          <Grid
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
            <CategoryIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {homeType}
            </Typography>
            The category of a property generally refers to its classification based on its usage or purpose
          </Grid>

          <Grid
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
            <AcUnitIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {hasCooling ? 'Has Cooling' : 'No Cooling'}
            </Typography>
            This indicates whether the home has a cooling system, such as air conditioning
          </Grid>

          <Grid
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
            <HotTubIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {hasSpa ? 'Has Spa' : 'No Spa'}
            </Typography>
            This indicates whether the home includes a spa or hot tub
          </Grid>

          <Grid
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
            <HotelIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Bedrooms: {numOfBedrooms}
            </Typography>
            The number of bedrooms in the home
          </Grid>

          <Grid
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
            <BathtubIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Bathrooms: {numOfBathrooms}
            </Typography>
            The number of bathrooms in the home
          </Grid>

          <Grid
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
            <SquareFootIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Living Area: {livingAreaSqFt} sq ft
            </Typography>
            The total living area of the home
          </Grid>

          <Grid
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
            <LocalParkingIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Parking Spaces: {parkingSpaces}
            </Typography>
            The number of parking spaces included with the home.
          </Grid>

          <Grid
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
            <AttachMoneyIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Price: {price}$
            </Typography>
            The listing price of the home.
          </Grid>

          <Grid
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
            <HomeIcon sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {streetAddress}
            </Typography>
            The physical street address of the home.
          </Grid>


      </Grid>
    </Box>
  );
};

export default Section;
