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
import { getWishlist } from '../api/wishlist'
import { getUserProperties } from '../api/properties';

export default function MyProperties(props) {
	const { category, title, rareFind = false, liked = false, image } = props;
	const navigate = useNavigate();

	const [properties, setProperties] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { user, setUser } = React.useContext(UserContext);

	useEffect(() => {
		try {
			setLoading(true);
			getUserProperties(user.token).then((data) => {
				setProperties(data);
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
					<Typography level="h2">My Properties</Typography>
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
									id: property._id,
									name: property.description.slice(0, 30),
									address: property.streetAddress,
									lat: property.latitude,
									lon: property.longitude,
									image: property.homeImage,
									price: property.price,
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
