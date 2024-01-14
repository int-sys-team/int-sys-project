import * as React from 'react';
import { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import SellerCard from './SellerCard';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/joy';
import { UserContext } from '../context/UserContext';
import {getAllUsers} from '../api/user';

export default function SellersList(props) {
	const navigate = useNavigate();

	const [sellers, setSellers] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { user } = React.useContext(UserContext);

	useEffect(() => {
		if(!user) {
			navigate('/login')
			return
		}

		try {
			setLoading(true);
      getAllUsers(user.token).then(res => { 
        // TODO: res.filter(seller => seller.properties.length > 0) kad imamo sellers
        setSellers(res)
      })
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, [user]);

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />

			<Box
				component="main"
				sx={{
					height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
					display: 'grid',
					gridTemplateColumns: { lg: '100%', xl: '50%' },
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				<Stack>
					<Typography level="h2">Sellers</Typography>
				</Stack>
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
							{sellers.map((seller) => (
								<SellerCard
									key={seller.id}
									{...seller}
								/>
							))}
						</Stack>
					)}
				</Stack>
			</Box>
		</CssVarsProvider>
	);
}
