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
import {
	Avatar,
	Badge,
	IconButton,
	Textarea,
	Tooltip,
	useTheme,
} from '@mui/joy';
import { Balance, Send } from '@mui/icons-material';
import { useCompareProperties } from '../hooks/useCompareProperties';
import RentalCard from './RentalCard';
import { Typography } from '@mui/material';

const conversation = [
	{
		sender: 'agent',
		content: 'Hello! Welcome to ABC Realty. How can I assist you today?',
	},
	{
		sender: 'client',
		content:
			"Hi there! I'm looking for a two-bedroom apartment in the downtown area.",
	},
	{
		sender: 'agent',
		content:
			"Great! We have several options available. What's your budget range?",
	},
	{
		sender: 'client',
		content: "I'm looking to stay between $2,000 and $2,500 per month.",
	},
	{
		sender: 'agent',
		content:
			'Perfect! We have a few listings that fit that criteria. When would you like to schedule a viewing?',
	},
	{
		sender: 'client',
		content:
			"I'm available on weekdays after 5 PM. Do you have anything around that time?",
	},
	{
		sender: 'agent',
		content:
			'Certainly! I can arrange a viewing for you on Thursday at 6:30 PM. How does that sound?',
	},
	{
		sender: 'client',
		content:
			"That works for me. Please send me the address, and I'll be there.",
	},
	{
		sender: 'agent',
		content:
			"Great! I'll email you all the details. Looking forward to meeting you on Thursday.",
	},
];

// TODO Try to open this in header
export default function PropertyComparison() {
	const theme = useTheme();
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
				<Stack useFlexGap spacing={3} sx={{ p: 0 }}>
					<DialogTitle sx={{ pl: 2, pt: 2 }}>
						Compare properties
					</DialogTitle>
					<ModalClose />
					{/* <Box
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
						
					</Box> */}
					<Stack
						spacing={2}
						sx={{
							px: 2,
							position: 'sticky',
							top: 10,
							width: '100%',
							zIndex: 10,
							backgroundColor: theme.palette.neutral[50],
						}}
					>
						{properties.map((property) => (
							<RentalCard key={property._id} {...property} />
						))}
					</Stack>
					<Stack sx={{ width: '100%', p: 0 }}>
						{conversation.map((message) => (
							<Stack
								key={message.content}
								direction="row"
								spacing={2}
								sx={{
									justifyContent: 'flex-start',
									flexDirection:
										message.sender === 'agent'
											? 'row'
											: 'row-reverse',
									width: '100%',
									alignItems: 'center',
									// backgroundColor:
									// 	message.sender === 'agent'
									// 		? 'primary.main'
									// 		: '#CCCCCC',
									px: 2,
								}}
							>
								<Avatar
									sx={{
										width: 40,
										height: 40,
										...(message.sender === 'agent' && {
											[sliderClasses.colorPrimary]:
												'primary.main',
										}),
									}}
									src={
										message.sender === 'agent'
											? '../public/llama.jpeg'
											: ''
									}
								></Avatar>
								<Stack
									direction="row"
									spacing={1}
									sx={{
										p: 2,
										...(message.sender === 'agent' && {
											bgcolor: 'primary.main',
											color: 'primary.contrastText',
											borderRadius: 2,
										}),
									}}
								>
									<Box
										sx={{
											backgroundColor:
												message.sender === 'agent'
													? '#BBBBBB00'
													: theme.palette
															.primary[500],
											borderRadius: 10,
											padding: 2,
											border:
												message.sender === 'agent'
													? '1px solid #BBBBBB'
													: 'none',
										}}
									>
										<Typography
											variant="body2"
											color={
												message.sender === 'agent'
													? 'black'
													: 'white'
											}
										>
											{message.content}
										</Typography>
									</Box>
								</Stack>
							</Stack>
						))}
					</Stack>
					<Box
						sx={{
							position: 'sticky',
							bottom: 0,
							width: '100%',
							p: 2,
							backgroundColor: theme.palette.neutral[50],
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Textarea
							minRows={2}
							maxRows={4}
							size="lg"
							placeholder="Type a message..."
							variant="outlined"
							sx={{ flexGrow: 1 }}
						/>
						<IconButton
							color="primary"
							variant="solid"
							size="large"
							sx={{
								ml: 2,
								width: 50,
								height: 50,
							}}
						>
							<Send />
						</IconButton>
					</Box>
				</Stack>
			</Drawer>
		</Stack>
	);
}
