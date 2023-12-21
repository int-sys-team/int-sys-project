import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Star from '@mui/icons-material/Star';
import {
	AcUnit,
	Bathroom,
	Bathtub,
	LocalParking,
	Place,
	Spa,
	SquareFoot,
	Thermostat,
} from '@mui/icons-material';

type RentalCardProps = {
  description: string;
	category: React.ReactNode;
	homeImage: string;
	liked?: boolean;
	rareFind?: boolean;
	title: React.ReactNode;
	hasCooling?: number;
	hasHeating?: number;
	hasSpa?: number;
	numOfBedrooms?: number;
	numOfBathrooms?: number;
	livingAreaSqFt?: number;
	parkingSpaces?: number;
	price?: number;
	city?: string;
	streetAddress?: string;
	onClick: () => void; // Add this line
};

export default function RentalCard(props: RentalCardProps) {
	const {
    description,
		category,
		title,
		rareFind = false,
		liked = false,
		homeImage,
		hasCooling,
		hasHeating,
		hasSpa,
		numOfBedrooms,
		numOfBathrooms,
		livingAreaSqFt,
		parkingSpaces,
		onClick,
		price,
		city,
		streetAddress,
	} = props;
	const [isLiked, setIsLiked] = React.useState(liked);
	return (
		<Card
			variant="outlined"
			orientation="horizontal"
			sx={{
				bgcolor: 'neutral.softBg',
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				'&:hover': {
					boxShadow: 'lg',
					borderColor:
						'var(--joy-palette-neutral-outlinedDisabledBorder)',
				},
			}}
		>
			<CardOverflow
				sx={{
					mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
					mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
					'--AspectRatio-radius': {
						xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
						sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
					},
				}}
			>
				<AspectRatio
					ratio="1"
					flex
					sx={{
						minWidth: { sm: 120, md: 160 },
						'--AspectRatio-maxHeight': {
							xs: '160px',
							sm: '9999px',
						},
					}}
				>
					<img alt="" src={homeImage} />
					<Stack
						alignItems="center"
						direction="row"
						sx={{
							position: 'absolute',
							top: 0,
							width: '100%',
							p: 1,
						}}
					>
						{rareFind && (
							<Chip
								variant="soft"
								color="success"
								startDecorator={<WorkspacePremiumRoundedIcon />}
								size="md"
							>
								Rare find
							</Chip>
						)}
						<IconButton
							variant="plain"
							size="sm"
							color={isLiked ? 'danger' : 'neutral'}
							onClick={() => setIsLiked((prev) => !prev)}
							sx={{
								display: { xs: 'flex', sm: 'none' },
								ml: 'auto',
								borderRadius: '50%',
								zIndex: '20',
							}}
						>
							<FavoriteRoundedIcon />
						</IconButton>
					</Stack>
				</AspectRatio>
			</CardOverflow>
			<CardContent>
				<Stack
					spacing={1}
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
				>
					<div>
						<Typography level="body-sm">{category}</Typography>
						<Typography level="title-md">
							<Link
								overlay
								underline="none"
								href="#interactive-card"
								sx={{ color: 'text.primary' }}
							>
								{description.substring(0, 50)}
							</Link>
						</Typography>
					</div>
					<IconButton
						variant="plain"
						size="sm"
						color={isLiked ? 'danger' : 'neutral'}
						onClick={() => setIsLiked((prev) => !prev)}
						sx={{
							display: { xs: 'none', sm: 'flex' },
							borderRadius: '50%',
						}}
					>
						<FavoriteRoundedIcon />
					</IconButton>
				</Stack>
				<Stack
					spacing="0.25rem 1rem"
					direction="row"
					useFlexGap
					flexWrap="wrap"
					sx={{ my: 0.25 }}
				>
					{(city || streetAddress) && (
						<Typography
							level="body-xs"
							startDecorator={<Place color="warning" />}
						>
							{city + ', ' + streetAddress}
						</Typography>
					)}
				</Stack>
				<Stack
					spacing="0.25rem 1rem"
					direction="row"
					useFlexGap
					flexWrap="wrap"
					sx={{ my: 0.25 }}
				>
					{livingAreaSqFt && (
						<Typography
							level="body-xs"
							startDecorator={<SquareFoot color='primary' />}
						>
							{livingAreaSqFt} sq ft
						</Typography>
					)}
					{hasCooling && (
						<Typography level="body-xs" startDecorator={<AcUnit />}>
							Cooling
						</Typography>
					)}
					{hasHeating && (
						<Typography
							level="body-xs"
							startDecorator={<Thermostat />}
						>
							Heating
						</Typography>
					)}
					{hasSpa!=0 && (
						<Typography level="body-xs" startDecorator={<Spa />}>
							Spa
						</Typography>
					)}
					{numOfBedrooms && (
						<Typography
							level="body-xs"
							startDecorator={<KingBedRoundedIcon />}
						>
							{numOfBedrooms} Bed
						</Typography>
					)}
					{numOfBathrooms && (
						<Typography
							level="body-xs"
							startDecorator={<Bathtub />}
						>
							{numOfBathrooms} Bath
						</Typography>
					)}
					{parkingSpaces!=0 && (
						<Typography
							level="body-xs"
							startDecorator={<LocalParking />}
						>
							{parkingSpaces} Parking
						</Typography>
					)}
				</Stack>
				<Stack direction="row" sx={{ mt: 'auto' }}>
					<Typography
						level="title-sm"
						startDecorator={
							<React.Fragment>
								<Star sx={{ color: 'warning.400' }} />
								<Star sx={{ color: 'warning.400' }} />
								<Star sx={{ color: 'warning.400' }} />
								<Star sx={{ color: 'warning.400' }} />
								<Star sx={{ color: 'warning.200' }} />
							</React.Fragment>
						}
						sx={{ display: 'flex', gap: 1 }}
					>
						4.0
					</Typography>
					{price && (
						<Typography
							level="h2"
							sx={{ flexGrow: 1, textAlign: 'right' }}
						>
							<strong>${Math.round(price/1000)}K</strong>{' '}
						</Typography>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
}
