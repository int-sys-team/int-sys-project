import * as React from 'react';
import { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import RentalCard from './RentalCard';
import HeaderSection from './HeaderSection';
import Search from './Search';
import Filters from './Filters';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/joy';
import PropertyComparison from './PropertyComparison';
import PropertyMap from './PropertyMap';

const locations = [
	{ name: 'Location 1', lat: 37.7749, lon: -122.4194 },
	{ name: 'Location 2', lat: 34.0522, lon: -118.2437 },
	// Add more locations as needed
];

export default function RentalDashboard(props) {
	const { category, title, rareFind = false, liked = false, image } = props;
	const navigate = useNavigate();

	const [properties, setProperties] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleClick = () => {
		navigate('/blog', {
			state: { title, category, image, rareFind, liked },
		});
	};

	const getProperties = async (page: number = 0, count: number = 10) => {
		const response = await fetch(
			`http://127.0.0.1:5000/db/properties?page=${page}&count=${count}`
		);
		if (!response.ok) {
			console.log(response);
			return;
		}
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		try {
			setLoading(true);
			getProperties().then((data) => {
				console.log(data);
				setProperties(data.properties);
			});
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, []);

	const naturalQueryProperties = async (query: string) => {
		try {
			setLoading(true);
			const response = await fetch(
				'http://127.0.0.1:5000/llm/properties',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						query: query,
					}),
				}
			);
			if (!response.ok) {
				console.log(response);
				return;
			}
			console.log(response);
			const data = await response.json();
			console.log(data);
			setProperties(data.properties);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />

			<Box
				component="main"
				sx={{
					height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
					display: 'grid',
					gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				<Stack
					sx={{
						backgroundColor: 'background.surface',
						px: { xs: 2, md: 4 },
						py: 2,
						borderBottom: '1px solid',
						borderColor: 'divider',
					}}
				>
					<HeaderSection />
					<Search
						onSearch={(query: string) => {
							console.log(query);
							naturalQueryProperties(query);
						}}
					/>
				</Stack>
				<Box
					sx={{
						gridRow: 'span 3',
						display: { xs: 'none', md: 'flex' },
						pl:1,
					}}
				>
					{properties.length>0&&<PropertyMap 
						locations={properties.map((property) => {
							return {
								name: property.streetAddress,
								lat: property.latitude,
								lon: property.longitude,
							};
						})}
					/>}
				</Box>
				<Stack
					spacing={2}
					sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}
				>
					<Box sx={{ display: 'flex', width: '100%', gap:1 }}>
						{/* <PropertyComparison /> */}
						<Box sx={{flexGrow:1}}>
							<Filters />
						</Box>
					</Box>
					{loading ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								width: 1,
							}}
						>
							<CircularProgress size="lg" variant="soft" />
						</Box>
					) : (
						<Stack spacing={2} sx={{ overflow: 'auto' }}>
							{properties.map((property) => (
								<RentalCard key={property._id} {...property} />
							))}
						</Stack>
					)}
				</Stack>
			</Box>
		</CssVarsProvider>
	);
}
