// LocationMap.js
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
					<Popup>{location.name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default PropertyMap;
