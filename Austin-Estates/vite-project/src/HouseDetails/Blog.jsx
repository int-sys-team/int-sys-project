import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Hero from './Hero';
import Section from './Section';
import Recommendation from './Recommendation';
import AboutUs from './AboutUs';
import { getPropertyById } from '../api/properties';
import { CircularProgress } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
	},
});

export default function Blog() {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getPropertyById(id).then((data) => {
			setProperty(data);
			setLoading(false);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container>
				{loading ? (
					<>
						<CircularProgress />
					</>
				) : (
					<>
						<Hero property={property} />
						<Section property={property} />
						<Recommendation property={property} />
					</>
				)}
			</Container>
		</ThemeProvider>
	);
}
