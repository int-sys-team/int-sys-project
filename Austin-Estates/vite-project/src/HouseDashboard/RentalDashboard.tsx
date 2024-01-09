import * as React from 'react';
import { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BoxJ from '@mui/joy/Box';
import ButtonJ from '@mui/joy/Button';
import RentalCard from './RentalCard';
import HeaderSection from './HeaderSection';
import Search from './Search';
import Filters from './Filters';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/joy';
import PropertyComparison from './PropertyComparison';
import PropertyMap from './PropertyMap';
import { getProperties, getPropertiesOrderedByLatestSaleDate, getPropertiesOrderedByPrice } from '../api/properties';
import { AI_API_URL, API_URL } from '../utils/config';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onNextPage: () => void;
	onPrevPage: () => void;
	setCurrentPage: (page: number) => void;
   }
   
   function Pagination({ currentPage, totalPages, onNextPage, onPrevPage, setCurrentPage }: PaginationProps) {
	return (
	  <div>
		<BoxJ
		  className="Pagination-mobile"
		  sx={{
			display: { xs: 'flex', md: 'none' },
			alignItems: 'center',
			mx: 2,
			my: 1,
		  }}
		>
		  <IconButton
			aria-label="previous page"
			variant="outlined"
			color="neutral"
			size="sm"
			onClick={onPrevPage}
			disabled={currentPage === 1}
		  >
			<ArrowBackIosRoundedIcon />
		  </IconButton>
		  <Typography level="body-sm" mx="auto">
			Page {currentPage} of {totalPages}
		  </Typography>
		  <IconButton
			aria-label="next page"
			variant="outlined"
			color="neutral"
			size="sm"
			onClick={onNextPage}
			disabled={currentPage === totalPages}
		  >
			<ArrowForwardIosRoundedIcon />
		  </IconButton>
		</BoxJ>
		<BoxJ
		  className="Pagination-laptopUp"
		  sx={{
			gap: 1,
			[`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
			display: {
			  xs: 'none',
			  md: 'flex',
			},
			mx: 4,
			my: 2,
		  }}
		>
		  <ButtonJ
			size="sm"
			variant="plain"
			color="neutral"
			startDecorator={<ArrowBackIosRoundedIcon />}
			onClick={onPrevPage}
			disabled={currentPage === 1}
		  >
			Previous
		  </ButtonJ>
   
		  <BoxJ sx={{ flex: 1 }} />
   
		  {Array.from({ length: totalPages }, (_, i) => i+1).map((page) => (
			<IconButton
			  key={page}
			  size="sm"
			  variant={page === currentPage ? 'soft' : 'outlined'}
			  color="neutral"
			  onClick={() => setCurrentPage(page)}
			>
			  {page}
			</IconButton>
		  ))}
   
		  <BoxJ sx={{ flex: 1 }} />
   
		  <ButtonJ
			size="sm"
			variant="plain"
			color="neutral"
			endDecorator={<ArrowForwardIosRoundedIcon />}
			onClick={onNextPage}
			disabled={currentPage === totalPages}
		  >
			Next
		  </ButtonJ>
		</BoxJ>
	  </div>
	);
   }

export default function RentalDashboard(props) {
	const { category, title, rareFind = false, liked = false, image } = props;
	const navigate = useNavigate();

	const [properties, setProperties] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [currentPage, setCurrentPage] = useState(1);
	
 	const itemsPerPage = 3;

	const [displayedProperties, setDisplayedProperties] = useState<any[]>([]);

	let [GlobalOrder, setGlobalOrder] = useState<string>("Initial")
	let GlobalStartIndex;

	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	   };
	  
	const prevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	   };

	useEffect(() => {
		setDisplayedProperties(properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
	}, [currentPage, GlobalOrder]);

	useEffect(() => {
		try {
		   setLoading(true);
		   GlobalStartIndex = currentPage * itemsPerPage;
		   handleOrderSelect(GlobalOrder)
		   
		} catch (e) {
		   console.log(e);
		} finally {
		   setLoading(false);
		}
	   }, [currentPage, GlobalOrder]);

	const naturalQueryProperties = async (query: string) => {
		try {
			setLoading(true);
			const response = await fetch(
				`${AI_API_URL}/llm/properties`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						query: query,
					}),
				}
			);
			if (!response.ok) {
				console.log(response);
				return;
			}
			console.log(response);
			const data = await response.json();
			console.log(data);
			setProperties(data.properties);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const handleOrderSelect = async (order: string) => {
	
		if (order === "Price") {
		  	const data = await getPropertiesOrderedByPrice();
		  	setProperties(data);
			  setGlobalOrder(order)
		  
		} else if (order === "Latest Date") {
		  	const data = await getPropertiesOrderedByLatestSaleDate();
		  	setProperties(data);
			  setGlobalOrder(order)
		}
		else{
			const data = await getProperties();
			console.log(data)
			setProperties(data.properties);
			setGlobalOrder("yoo")
		}
		
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />

			<Box
				component="main"
				sx={{
					height: 'calc(95vh - 55px)', 
					display: 'grid',
					gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				<Stack
					sx={{
						backgroundColor: 'background.surface',
						px: { xs: 2, md: 4 },
						py: 2,
						borderBottom: '1px solid',
						borderColor: 'divider',
					}}
				>
					<HeaderSection />
					<Search
						onSearch={(query: string) => {
							console.log(query);
							naturalQueryProperties(query);
						}}
					/>
				</Stack>
				<Box
					sx={{
						gridRow: 'span 3',
						display: { xs: 'none', md: 'flex' },
						pl:1,
					}}
				>
					{properties.length>0&&<PropertyMap 
						locations={properties.map((property) => {
							return {
								id: property._id,
								name: property.description.slice(0, 30),
								address: property.streetAddress,
								lat: property.latitude,
								lon: property.longitude,
								image: property.homeImage,
								price: property.price,
							};
						})}
					/>}
				</Box>
				<Stack
					spacing={2}
					sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}
				>
					<Box sx={{ display: 'flex', width: '100%', gap:1 }}>
						{/* <PropertyComparison /> */}
						<Box sx={{flexGrow:1}}>
							<Filters onSelect={handleOrderSelect}/>
						</Box>
					</Box>
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
							{displayedProperties.map((property) => (
								<RentalCard key={property._id} {...property} />
							))}
						</Stack>
					)}
				</Stack>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(properties.length / itemsPerPage)}
					onNextPage={nextPage}
					onPrevPage={prevPage}
					setCurrentPage={setCurrentPage}
					/>
			</Box>
		</CssVarsProvider>
	);
}
