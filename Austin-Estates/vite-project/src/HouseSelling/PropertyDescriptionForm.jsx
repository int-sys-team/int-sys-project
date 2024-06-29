import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import PropertyContext from '../context/PropertyContext';
import { StreamHandler } from '../utils/StreamHandler';
import { Card } from '@mui/material';
import { useTheme } from '@emotion/react';
import { AI_API_URL, API_URL } from '../utils/config';
import {predictPropertyPrice} from '../api/properties';

export default function PropertyDescriptionForm() {
  const [description, setDescription] = React.useState('');
  const [responding, setResponding] = React.useState(false);

  const { propertyData, setPropertyData } = useContext(PropertyContext);

  const handleFieldChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  // Update the generateDescription function to extract only the description text
  const generateDescription = async () => {
    console.log(propertyData);
    if (responding) return;
    if (!propertyData) return;
    if (Object.keys(propertyData).length === 0) return;

    setResponding(true);
    try {
        let newDescription = '';
        setDescription('');
        let stream = new StreamHandler(`${AI_API_URL}/llm/description`);
        stream.invoke(
            {
                data: propertyData,
                stream: false,
            },
            (chunk) => {
                console.log(chunk);
                if (chunk === '###DONE###') {
                    setPropertyData({
                        ...propertyData,
                        ['description']: newDescription,
                    });
                    setResponding(false);
                    console.log(propertyData);
                    return;
                }
                newDescription += chunk;
                // Extract only the text from the response object
                const extractedDescription = JSON.parse(newDescription).description;
                setDescription(extractedDescription);
            }
        );
    } catch (err) {
        console.log(err);
        setResponding(false);
    }
  };

  const generatePrice = () => {
    setPropertyData({...propertyData, price: "Generating price..."})

    const property = {}
    Object.keys(propertyData).map(key => {
      property[key] = Number(propertyData[key])
    })
    predictPropertyPrice(property).then(price => {
      setPropertyData({...propertyData, price})
    });
  };

  return (
		<>
			<Typography variant="h6" gutterBottom>
				Property Description
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						id="imageLink"
						name="imageLink"
						label="Image Link"
						fullWidth
						variant="standard"
						onChange={handleFieldChange}
            value={propertyData.imageLink}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="propertyTitle"
						name="propertyTitle"
						label="Property Title"
						fullWidth
						variant="standard"
						onChange={handleFieldChange}
            value={propertyData.propertyTitle}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="description"
						name="description"
						label="Description"
						multiline
						rows={10}
						value={description}
						fullWidth
						variant="outlined"
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Tooltip title="Our AI will generate the description">
						<Button
							variant="contained"
							color="primary"
							onClick={generateDescription}
							disabled={responding}
						>
							Generate Description
						</Button>
					</Tooltip>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						display: 'flex',
					}}
				>
					<TextField
						id="price"
						name="price"
						label="Price"
						value={propertyData.price}
						variant="outlined"
						onChange={handleFieldChange}
            sx={{
              flexGrow: 1,
            }}
					/>
					<Tooltip
						title="Our AI will generate the price"
						style={{ marginLeft: '10px' }}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={generatePrice}
						>
							Predict Price
						</Button>
					</Tooltip>
				</Grid>
				{/* <Grid item xs={12}>
					<Tooltip title="Our AI will generate the description">
						<Button
							variant="contained"
							color="primary"
							onClick={generateDescription}
							disabled={responding}
						>
							Generate Description
						</Button>
					</Tooltip>
					<Tooltip
						title="Our AI will generate the price"
						style={{ marginLeft: '10px' }}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={generatePrice}
						>
							Generate Price
						</Button>
					</Tooltip>
				</Grid> */}
			</Grid>
		</>
  );
}
