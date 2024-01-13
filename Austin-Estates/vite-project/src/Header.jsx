import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCompareProperties } from './hooks/useCompareProperties.jsx';
import ColorSchemeToggle from './ColorThemeToggle.jsx';
import { CssVarsProvider } from '@mui/joy';
import PropertyComparison from './HouseDashboard/PropertyComparison.jsx';
import { UserContext } from './context/UserContext.js';
import { Link } from 'react-router-dom'
import { logout } from './api/auth.ts'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const HeaderButton = ({to='#', children, onClick}) => (
	<Grid item>
		<Button
			component={Link}
			to={to}
			onClick={onClick}
			variant="outlined"
			color="inherit"
			sx={{
				borderColor: lightColor,
				'&:hover': {
					color: 'common.white',
					borderColor: 'common.white',
				},
			}}
		>
			<Typography variant="h7">{children}</Typography>
		</Button>
	</Grid>
)

const GuestButtons = (_props) => (
	<>
		<HeaderButton to="/signup">Sign up</HeaderButton>
		<HeaderButton to="/login">Log in</HeaderButton>
	</>
)

const UserButtons = ({user, onLogOutClick}) => (
	<>
		<HeaderButton onClick={onLogOutClick}>Log out</HeaderButton>
		<Grid item justifyContent="flex-end">
			<IconButton color="inherit" sx={{ p: 0.5 }}>
				<Avatar
					component={Link}
					to={`/profile/${user.userData.id}`}
					src="/static/images/avatar/1.jpg" //src={user.avatarUrl} //UKOLIKO IMAMO SLIKU KORISNIKA
					alt={user.email.charAt(0)}
					sx={{ textDecoration: 'none' }}
				>
					{user.userName}
				</Avatar>
			</IconButton>
		</Grid>
	</>
)

function Header(props) {
	const { onDrawerToggle } = props;
	const { getCount } = useCompareProperties();
	const { user, setUser } = React.useContext(UserContext);

	const onLogOut = async () => {
		setUser(null);
		await logout(user.token);
	}

	return (
		<React.Fragment>
			<AppBar color="primary" position="sticky" elevation={0}>
				<Toolbar>
					<Grid
						container
						spacing={1}
						alignItems="center"
						width="100%"
					>
						<Grid
							sx={{ display: { sm: 'none', xs: 'block' } }}
							item
						>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={onDrawerToggle}
								edge="start"
							>
								<MenuIcon />
							</IconButton>
						</Grid>

						<Grid item>
							<CssVarsProvider>
								<PropertyComparison />
							</CssVarsProvider>
						</Grid>

						<Grid
							item
							xs
							container
							alignItems="center"
							justifyContent="center"
						>
							<Typography variant="h7" align="center">
								Austin Real Estates
							</Typography>
						</Grid>

						{!user && <GuestButtons />}

						{user && 
							<UserButtons
								user={user}
								onLogOutClick={onLogOut}
							/>
						}

						<Grid item justifyContent="flex-end">
							<CssVarsProvider>
								<ColorSchemeToggle />
							</CssVarsProvider>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	  );
}

Header.propTypes = {
	onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
