import React from 'react';
import { Box, CssVarsProvider, Stack, styled, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import FooterTitle from './FooterTitle';
import FooterLink from './FooterLink';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material';

const Footer = () => {
  const theme=useTheme();
	const StackColumn = styled(Stack)(() => ({
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		gap: 8,
		textAlign: 'center',
	}));

	const BoxRow = styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			gap: 30,
		},
	}));

	return (
		<CssVarsProvider>
			<BoxRow
				sx={{
					py: 10,
					px: 2,
					backgroundColor: 'background.surface',
				}}
				bgcolor={theme.palette.background}
			>
				<StackColumn>
					<FooterTitle text={'address'} />
					<FooterLink text={'Aleksandra Medvedeva 14. 18104 Niš'} />
					<FooterLink
						text={
							'Serbia Phone: +381 (18) 529-105 Fax: +381 (18) 588-399'
						}
					/>
					<FooterLink text={'efinfo@elfak.ni.ac.rs'} />
				</StackColumn>

				<StackColumn>
					<FooterTitle text={'our services'} />
					<FooterLink text={'AI property valuation'} />
					<FooterLink text={'AI property recommendation'} />
					<FooterLink text={'sell house with AI'} />
					<FooterLink text={'buy house with AI'} />
				</StackColumn>
				<StackColumn>
					<FooterTitle text={'our "company"'} />
					<FooterLink text={'about us'} />
					<FooterLink text={'our team'} />
					<FooterLink text={'contact us'} />
				</StackColumn>

				<StackColumn>
					<FooterTitle text={'AI Estates'} />
					<Stack
						direction="row"
						width="70px"
						maxWidth="100%"
						justifyContent="space-between"
					>
						<Link href="#" variant="body2">
							<InstagramIcon />
						</Link>
						<Link
							href="#"
							variant="body2"
							sx={{
								color: 'text.secondary',
								'&:hover': {
									color: '#1c2859',
								},
							}}
						>
							<FacebookIcon />
						</Link>
					</Stack>
					<Typography variant="caption" component="p">
						&copy; 2024 AI Austin Estates Inc.
					</Typography>
				</StackColumn>
			</BoxRow>
		</CssVarsProvider>
	);
};

export default Footer;
