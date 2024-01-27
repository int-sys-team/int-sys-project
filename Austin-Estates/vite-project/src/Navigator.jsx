import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { AddHomeWork, Favorite, ListAlt } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
	{
		id: 'Buy',
		children: [
			{
				id: 'explore',
				name: 'Explore',
				icon: <PublicIcon />,
				active: true,
			},
			{ name: 'My Favorites', id: 'myFavorites', icon: <Favorite /> },
			{ name: 'Sellers', id: 'sellers', icon: <PeopleIcon /> },
			// { id: 'Hosting', icon: <PublicIcon /> },
			// { id: 'Functions', icon: <SettingsEthernetIcon /> },
			// {
			//   id: 'Machine learning',
			//   icon: <SettingsInputComponentIcon />,
			// },
		],
	},
	{
		id: 'Sell',
		children: [
			{ name: 'New Post', id: 'newPost', icon: <AddHomeWork /> },
			//{ id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
		],
	},
];

const item = {
	py: '2px',
	px: 3,
	color: 'rgba(255, 255, 255, 0.7)',
	'&:hover, &:focus': {
		bgcolor: 'rgba(255, 255, 255, 0.08)',
	},
};

const itemCategory = {
	boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
	py: 1.5,
	px: 3,
};

export default function Navigator(props) {
	const { ...other } = props;
	const navigate = useNavigate();
  const location=useLocation();

	return (
		<Drawer variant="permanent" {...other}>
			<List disablePadding>
				<ListItem
					sx={{
						...item,
						...itemCategory,
						fontSize: 22,
						color: '#fff',
					}}
				>
					Austin Estates
				</ListItem>
				<ListItem sx={{ ...item, ...itemCategory }} onClick={() => navigate('/')}>
					<ListItemIcon >
						<HomeIcon />
					</ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
				{categories.map(({ id, children }) => (
					<Box key={id} sx={{ bgcolor: '#101F33' }}>
						<ListItem sx={{ py: 2, px: 3 }}>
							<ListItemText sx={{ color: '#fff' }}>
								{id}
							</ListItemText>
						</ListItem>
						{children.map(({ id, name, icon, active }) => (
							<ListItem
								disablePadding
								key={id}
								onClick={() =>
									navigate('/'+id)
								}
							>
								<ListItemButton selected={location.pathname==='/'+id} sx={item}>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText>{name}</ListItemText>
								</ListItemButton>
							</ListItem>
						))}
						<Divider sx={{ mt: 2 }} />
					</Box>
				))}
			</List>
		</Drawer>
	);
}
