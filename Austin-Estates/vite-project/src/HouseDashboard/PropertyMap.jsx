// LocationMap.js
import { Place } from '@mui/icons-material';
import {
	AspectRatio,
	Card,
	CardContent,
	CardOverflow,
	Typography,
} from '@mui/joy';
import { Stack } from '@mui/system';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PropertyMap = ({ locations }) => {
	const center = [locations[0].lat, locations[0].lon]; // Use the first location as the center

	return (
		<MapContainer
			center={center}
			zoom={12}
			style={{ height: '90%', width: '100%' }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{locations.map((location, index) => (
				<Marker key={index} position={[location.lat, location.lon]}>
					<PropertyPopup location={location} />
				</Marker>
			))}
		</MapContainer>
	);
};

const PropertyPopup = ({ location }) => {
	return (
		<Popup>
			<Card
				variant="outlined"
				orientation="horizontal"
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column' },
					'&:hover': {
						boxShadow: 'lg',
						borderColor:
							'var(--joy-palette-neutral-outlinedDisabledBorder)',
					},
					minWidth: '50%',
				}}
			>
				<CardOverflow
					sx={{
						mr: { xs: 'var(--CardOverflow-offset)' },
						mb: { xs: 0 },
						'--AspectRatio-radius': {
							xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
						},
					}}
				>
					<AspectRatio
						ratio="1"
						flex
						sx={{
							minWidth: { xs: 250 },
							'--AspectRatio-maxHeight': {
								xs: '120px',
							},
						}}
					>
						<img alt="" src={location.image} />
					</AspectRatio>
				</CardOverflow>
				<CardContent>
					<Stack
						spacing={1}
						direction="row"
						justifyContent="space-between"
						alignItems="flex-start"
					>
						<Typography level="title-md" >
							{location.name}
						</Typography>
					</Stack>
					<Stack
						spacing="0.25rem 1rem"
						direction="row"
						useFlexGap
						flexWrap="wrap"
						sx={{ my: 0.25 }}
					>
						<Typography
							level="body-xs"
							startDecorator={<Place color="warning" />}
						>
							{location.address}
						</Typography>
					</Stack>
					<Stack direction="row" sx={{ mt: 'auto' }}>

						<Typography
							level="h2"
							sx={{ flexGrow: 1, textAlign: 'right' }}
						>
							<strong>
								${Math.round(location.price / 1000)}K
							</strong>{' '}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Popup>
	);
};

export default PropertyMap;
