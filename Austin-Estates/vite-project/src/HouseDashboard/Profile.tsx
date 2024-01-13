import * as React from 'react';
import { useEffect, useState } from 'react';
import { CssVarsProvider, useTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import RentalCard from './RentalCard';
import HeaderSection from './HeaderSection';
import Search from './Search';
import Filters from './Filters';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Textarea, Typography } from '@mui/joy';
import PropertyComparison from './PropertyComparison';
import PropertyMap from './PropertyMap';
import { UserContext } from '../context/UserContext';
import Input from '@mui/joy/Input';
import { getUser } from '../api/user';
import {getAllProperties} from '../api/properties';

// Different responsiveness based on if seller or not
const DoubleField = ({children, seller}) => (
	seller? (
		<Stack 
			direction={{md: "row", lg: "column", xl: "row"}} 
			spacing={{xs: 1, md: 3, lg: 1, xl: 3}} 
			useFlexGap 
		>
			{children}
		</Stack>
	) : (
		<Stack 
			direction={{sm: "column", md: "row"}} 
			spacing={{sm: 1, md: 3 }} 
			useFlexGap 
		>
			{children}
		</Stack>
	)
)

const ProfileField = ({title, ...rest}) => (
	<Box flexGrow={1} minWidth={100}>
		{title}
		<Input {...rest} />
	</Box>
)

// Styling for panes
const ProfileArea = ({title, children}) => (
	<Stack
		sx={{
			backgroundColor: 'background.surface',
			px: { xs: 2, md: 4 },
			py: 2,
			borderBottom: '1px solid',
			borderColor: 'divider',
			maxHeight: 'calc(100vh - 55px)', // 55px is the height of the NavBar
		}}
	>
		<Stack>
			<Typography level="h2">{title}</Typography>
		</Stack>
		{children}
	</Stack>
)

// Information on the profile
const ProfileInfo = ({editable=false, user, seller=false}) => (
	<ProfileArea title="Profile">
		<Stack direction="column" spacing={1}>
			<DoubleField seller={seller}>
				<ProfileField title="First Name" value={user.firstName} readOnly={!editable}/>
				<ProfileField title="Last Name" value={user.lastName} readOnly={!editable}/>
			</DoubleField>
			<DoubleField seller={seller}>
				<ProfileField title="E-mail" value={user.email} readOnly={!editable}/>
				<ProfileField title="Contact" value={user.contact} readOnly={!editable}/>
			</DoubleField>
			<Box>
				Biography
				<Textarea value={user.biography} readOnly={!editable}/>
			</Box>
		</Stack>
	</ProfileArea>
)

// Information on the profile
const ProfileHouses = ({properties}) => (
	<ProfileArea title="Catalog">
		<Stack spacing={2} sx={{ overflow: 'auto' }}>
			{properties.map((property) => (
				<RentalCard key={property._id} {...property} />
			))}
		</Stack>
	</ProfileArea>
)

export default function Profile(props) {
	const { category, title, rareFind = false, liked = false, image } = props;
	const navigate = useNavigate();
	const { id } = useParams();

	const [properties, setProperties] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const defaultProfile = {
		firstName: '',
		lastName: '',
		email: '',
		contact: '',
		biography: '',
	};

	const [profile, setProfile] = useState<any>(defaultProfile);
	const { user } = React.useContext(UserContext);

	const isSeller = properties && properties.length > 0

	useEffect(() => {
		try {
			setLoading(true);
			if(!!user && !!user.token)
				getUser(id, user.token)
					.then(res => setProfile(res));

			// TODO: Placeholder until API call is made.
			getAllProperties()
				.then(res => setProperties(res));
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, [id, user]);

	return (
		<CssVarsProvider>
			<CssBaseline />
			<Box
				component="main"
				sx={{
					height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
					display: 'grid',
					gridTemplateColumns: { xs: 'auto', md: '100%' },
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				<Stack
					spacing={2}
					sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}
					height="100%"
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
						<>
							{ isSeller && (
								<Box
									component="main"
									alignItems="flex-start"
									sx={{
										height: '100%',
										display: 'grid',
										gridTemplateColumns: { md: 'auto', lg: '40% 60%' },
										gridTemplateRows: 'auto 1fr auto',
										gridGap: '10px'
									}}
								>
									<Stack direction="column" height="100%" spacing={2}>
										<ProfileInfo user={profile} seller/>
										<Box
											height="100%"
											width="100%"
										>
											<PropertyMap 
												locations={properties.map((property) => {
													return {
														name: property.streetAddress,
														lat: property.latitude,
														lon: property.longitude,
													};
												})}
											/>
										</Box>
									</Stack>
									<ProfileHouses properties={properties} />
								</Box>
							)}

							{ !isSeller && (
								<Box
									component="main"
									alignItems="flex-start"
									sx={{
										height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
										maxWidth: '50em',
									}}
								>
									<ProfileInfo user={profile}/>
								</Box>
							)}
						</>
					)}
				</Stack>
			</Box>
		</CssVarsProvider>
	);
}
