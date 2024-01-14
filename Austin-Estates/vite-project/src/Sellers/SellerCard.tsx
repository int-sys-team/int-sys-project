import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import OpenInNew from '@mui/icons-material/OpenInNew';
import {
	Phone,
	Mail,
	House,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function SellerCard(props) {
	const {
		id,
		rareFind = false,
		firstName,
		lastName,
		email,
		contact,
		image,
		biography,
		properties,
		onClick,
	} = props;

	return (
		<Card
			variant="outlined"
			orientation="horizontal"
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				'&:hover': {
					boxShadow: 'lg',
					borderColor:
						'var(--joy-palette-neutral-outlinedDisabledBorder)',
				},
				minWidth: '50%',
			}}
		>
			<CardContent>
				<Stack>
					<div>
						<Typography level="title-md">
							{firstName} {lastName}
						</Typography>
					</div>
				</Stack>
				<Stack
					spacing="0.25rem 1rem"
					direction="row"
					useFlexGap
					flexWrap="wrap"
					sx={{ my: 0.25 }}
				>
					{email && (
						<Typography
							level="body-xs"
							startDecorator={<Mail color="primary" />}
						>
							{email}
						</Typography>
					)}
					{contact && (
						<Typography
							level="body-xs"
							startDecorator={<Phone color="primary" />}
						>
							{contact}
						</Typography>
					)}
					{properties && (
						<Typography
							level="body-xs"
							startDecorator={<House color="primary" />}
						>
							{properties.length} listings
						</Typography>
					)}
				</Stack>
				{ biography && (
					<Stack
						sx={{ my: 0.25 }}
					>
							<Typography level="body-sm">
									{biography.substring(0, 50)}
							</Typography>
					</Stack>
				)}
				<Stack direction="row-reverse" sx={{ mt: 'auto' }}>
					<Button
						component={Link} to={`/profile/${id}`}
						startDecorator={<OpenInNew />}
						size="sm"
						variant="soft"
					>
						Details
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
}
