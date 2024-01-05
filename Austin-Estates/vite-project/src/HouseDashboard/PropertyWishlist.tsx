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
import { CircularProgress, Typography } from '@mui/joy';
import PropertyComparison from './PropertyComparison';
import PropertyMap from './PropertyMap';
import { UserContext } from '../context/UserContext';
import { getPropertyById } from '../api/properties'

const locations = [
	{ name: 'Location 1', lat: 37.7749, lon: -122.4194 },
	{ name: 'Location 2', lat: 34.0522, lon: -118.2437 },
	// Add more locations as needed
];

export default function PropertyWishlist(props) {
	const { category, title, rareFind = false, liked = false, image } = props;
	const navigate = useNavigate();

	const [properties, setProperties] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { user, setUser } = React.useContext(UserContext);

	const handleClick = () => {
		navigate('/blog', {
			state: { title, category, image, rareFind, liked },
		});
	};

	const getWishlist = async (page: number = 0, count: number = 10) => {
		try {
			const wishlist = await Promise.all(
				user.userData.wishes.map(async (id: string) => {
					return await getPropertyById(id);
				})
			);
			return { properties: wishlist };
		} catch (e) {
			console.log(e);
			return { properties: [] };
		}
	};

	useEffect(() => {
		try {
			setLoading(true);
			getWishlist().then((data) => {
				console.log(data);
				setProperties(data.properties);
			});
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, []);

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
				<Stack>
					<Typography level="h2">My Favorites</Typography>
				</Stack>
				<Box
					sx={{
						gridRow: 'span 2',
						display: { xs: 'none', md: 'flex' },
						pl: 1,
					}}
				>
					{properties.length > 0 && (
						<PropertyMap
							locations={properties.map((property) => {
								return {
									name: property.streetAddress,
									lat: property.latitude,
									lon: property.longitude,
								};
							})}
						/>
					)}
				</Box>
				<Stack
					spacing={2}
					sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}
				>
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
								<RentalCard
									key={property._id}
									{...property}
									liked={true}
								/>
							))}
						</Stack>
					)}
				</Stack>
			</Box>
		</CssVarsProvider>
	);
}
