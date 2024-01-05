import React, { useState, useEffect } from 'react';
import JoyCard from '@mui/joy/Card';
import JoyBox from '@mui/joy/Box';
import JoyTypography from '@mui/joy/Typography';
import JoyGrid from '@mui/joy/Grid';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import RentalCard from '../HouseDashboard/RentalCard';
import { Stack } from '@mui/joy';
import { getSimilarProperties } from '../api/properties';


const Recommendation = (props) => {
  const { _id } = props.property;

  const [similarHouses, setSimilarHouses] = useState([]);

  useEffect(() => {
    getSimilarProperties(_id).then(houses => {
      setSimilarHouses(houses)
    })
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
