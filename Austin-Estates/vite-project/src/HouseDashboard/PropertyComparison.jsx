import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import { Avatar, Badge, IconButton, Tooltip } from '@mui/joy';
import { Balance } from '@mui/icons-material';
import { useCompareProperties } from '../hooks/useCompareProperties';
import RentalCard from './RentalCard';
import { Typography } from '@mui/material';

function valueText(value) {
	return `$${value.toLocaleString('en-US')}`;
}
// TODO Try to open this in header
export default function PropertyComparison() {
	const [open, setOpen] = React.useState(false);
	const { properties, getCount } = useCompareProperties();
	return (
		<Stack
			useFlexGap
			direction="row"
			spacing={{ xs: 0, sm: 2 }}
			justifyContent={{ xs: 'space-between' }}
			flexWrap="wrap"
			sx={{ minWidth: 0 }}
		>
			{/* <Button
				variant="outlined"
				color="neutral"
				startDecorator={<FilterAltOutlined />}
				onClick={() => setOpen(true)}
			>
				Filters
			</Button> */}
			<Badge
				badgeContent={getCount()}
				color="danger"
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<Button
					variant="outlined"
					color="neutral"
					startDecorator={<Balance />}
					onClick={() => setOpen(true)}
				>
					Compare
				</Button>
			</Badge>
			<Drawer open={open} onClose={() => setOpen(false)} size="lg">
				<Stack useFlexGap spacing={3} sx={{ p: 2 }}>
					<DialogTitle>Compare properties</DialogTitle>
					<ModalClose />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						Chat layout...
						<Avatar
							sx={{	width: 200, height: 200, mb: 2 }}
							src=''
						>
						</Avatar>
						
					</Box>
					<Stack spacing={2} sx={{ overflow: 'auto' }}>
						{properties.map((property) => (
							<RentalCard key={property._id} {...property} />
						))}
					</Stack>
				</Stack>
			</Drawer>
		</Stack>
	);
}
