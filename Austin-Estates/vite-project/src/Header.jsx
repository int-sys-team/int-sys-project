import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { NavLink } from 'react-router-dom';
import { Balance, GitHub } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useCompareProperties } from './hooks/useCompareProperties.jsx';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
	const { onDrawerToggle } = props;
	const { getCount } = useCompareProperties();

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
							<Link
								component="a"
								href="https://github.com/int-sys-team/int-sys-project"
								target="_blank"
								rel="noopener noreferrer"
								sx={{
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								<IconButton color="inherit">
									<GitHub />
								</IconButton>
							</Link>
						</Grid>

						<Grid
							item
							xs
							container
							alignItems="center"
							justifyContent="center"
						></Grid>
						<Grid item>
							<Button
								href="/explore/signup"
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
								<Typography variant="h7">Sign-up</Typography>
							</Button>
						</Grid>
						<Grid item>
							<Button
								href="/signin"
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
								<Typography variant="h7">Sign-in</Typography>
							</Button>
						</Grid>

						{/* <Grid item>
							<Tooltip title="Alerts • No alerts">
								<IconButton color="inherit">
									<NotificationsIcon />
								</IconButton>
							</Tooltip>
						</Grid> */}
						<Grid item justifyContent="flex-end">
							<IconButton color="inherit" sx={{ p: 0.5 }}>
								<Avatar
									src="/static/images/avatar/1.jpg"
									alt="My Avatar"
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			{/* <AppBar
				component="div"
				position="static"
				elevation={0}
				sx={{ zIndex: 0 }}
			>
				<Tabs value={0} textColor="inherit">
					<Tab label="Houses" />
					<Tab label="Sell Houses" />
					<Tab
						label="About us"
						component={NavLink}
						to="/overview/aboutus"
						sx={{ color: 'inherit', textDecoration: 'none' }}
					/>
					<Tab label="Usage" />
				</Tabs>
			</AppBar> */}
		</React.Fragment>
	);
}

Header.propTypes = {
	onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
