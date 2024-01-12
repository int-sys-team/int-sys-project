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
import { StreamHandler } from '../utils/StreamHandler';
import { AI_API_URL, API_URL } from '../utils/config';

const getDataFromProperty = (property) => {
	return {
		description: property.description,
		cooling: property.hasCooling ? 'YES' : 'NO',
		heating: property.hasHeating ? 'YES' : 'NO',
		number_of_rooms: property.numOfBedrooms,
		area: property.livingAreaSqFt,
		parking: property.parkingSpaces > 0 ? 'YES' : 'NO',
		price: property.price,
	};
};

// TODO Try to open this in header
export default function PropertyComparison() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const { properties, getCount } = useCompareProperties();

	const [conversation, setConversation] = React.useState([
		{
			sender: 'agent',
			content: 'Hello! How can I assist you today?',
		},
	]);
	const [responding, setResponding] = React.useState(false);

	const [currentMessage, setCurrentMessage] = React.useState('');

	const sendMessage = async (message) => {
		console.log(message);
		if (responding) return;
		if (message === '') return;
		if (properties.length < 2) return;

		setResponding(true);
		console.log(conversation);
		try {

			const newConversation = [...conversation, message,{
				sender: 'agent',
				content: '',
			}];
			setConversation(newConversation);
			let stream = new StreamHandler(`${AI_API_URL}/llm/compare`);
			stream.invoke(
				{
					option1: getDataFromProperty(properties[0]),
					option2: getDataFromProperty(properties[1]),
					messages: newConversation.slice(0, -1),
					stream: true,
				},
				(chunk) => {
					console.log(chunk);
					if (chunk === '###DONE###') {
						setResponding(false);
						return;
					}
					const lastMessage = newConversation[newConversation.length - 1];
					lastMessage.content += chunk;
					setConversation([...newConversation.slice(0, -1), lastMessage]);
				}
			);
		} catch (err) {
			console.log(err);setResponding(false);
		} 
	};

	return (
		<Stack
			useFlexGap
			direction="row"
			spacing={{ xs: 0, sm: 2 }}
			justifyContent={{ xs: 'space-between' }}
			flexWrap="wrap"
			sx={{ minWidth: 0 }}
		>
			<Badge
				badgeContent={getCount()}
				color="danger"
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				size='sm'
				// sx={{
				// 	mt:2
				// }}
			>
				{/* <Button
					variant="outlined"
					color="neutral"
					startDecorator={<Balance />}
					onClick={() => setOpen(true)}
				>
				</Button> */}
				<IconButton
					size="small"
					onClick={() => setOpen(true)}
					sx={{
						color:'white',
						borderRadius: '50%',
					}}
					color='primary'
				>
					<Balance />
				</IconButton>
			</Badge>
			<Drawer open={open} onClose={() => setOpen(false)} size="lg">
				<Stack useFlexGap spacing={3} sx={{ p: 0 }}>
					<DialogTitle sx={{ pl: 2, pt: 2 }}>
						Compare properties
					</DialogTitle>
					<ModalClose />
					<Stack
						spacing={2}
						sx={{
							px: 2,
							position: 'sticky',
							top: 10,
							width: '100%',
							zIndex: 10,
						}}
					>
						{properties.map((property) => (
							<RentalCard key={property._id} {...property} />
						))}
					</Stack>
					<Stack sx={{ width: '100%', p: 0 }}>
						{conversation.map((message, index) => (
							<Stack
								key={index}
								direction="row"
								spacing={1}
								sx={{
									justifyContent: 'flex-start',
									flexDirection:
										message.sender === 'agent'
											? 'row'
											: 'row-reverse',
									width: '100%',
									alignItems: 'flex-end',
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
											? '/llama.jpeg'
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
											// color={
											// 	message.sender === 'agent'
											// 		? 'black'
											// 		: 'white'
											// }
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
							disabled={responding}
							sx={{ flexGrow: 1 }}
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
						/>
						<IconButton
							color="primary"
							variant="solid"
							size="large"
							disabled={responding}
							sx={{
								ml: 2,
								width: 50,
								height: 50,
							}}
							onClick={
								() => {
									console.log(currentMessage);
									setCurrentMessage('');
									sendMessage({
										sender: 'client',
										content: currentMessage,
									});
								}
								// sendMessage({
								// 	sender: 'user',
								// 	content: 'Hello!',
								// })
							}
						>
							<Send />
						</IconButton>
					</Box>
				</Stack>
			</Drawer>
		</Stack>
	);
}
