import React, { useState, useEffect } from 'react';
import JoyCard from '@mui/joy/Card';
import JoyBox from '@mui/joy/Box';
import JoyTypography from '@mui/joy/Typography';
import JoyGrid from '@mui/joy/Grid';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import RentalCard from '../HouseDashboard/RentalCard';
import { Stack } from '@mui/joy';



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
    fetchSimilarProperties(_id);
  }, [_id]);
  
  
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <JoyBox
        sx={{
          flexGrow: 1,
          padding: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
        }}
      >
        <JoyTypography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'left' }}>
          AI-Powered recommendations for you
        </JoyTypography>
  
        <Stack
					spacing={3}
					sx={{  pt: 2, minHeight: 0, overflow: 'auto'  }}
          direction="row"
				>
          {similarHouses.map((house) => (
              <RentalCard key={house._id} {...house} />
          ))}
        </Stack>
      </JoyBox>
    </CssVarsProvider>
  );
};

export default Recommendation;
