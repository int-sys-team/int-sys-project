import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';
import { TextField } from '@mui/material';

type searchProps = {
	onSearch: (query: string) => any;
};

export default function Search(props: searchProps) {
	const { onSearch } = props;
	const [query, setQuery] = React.useState<string>('');
	return (
		<div>
			<Stack spacing={1} direction="row" sx={{ mb: 2 }}>
				<Input
					placeholder="Example: 'I need a house with 3 bedrooms and 2 bathrooms'"
					startDecorator={<SearchRoundedIcon />}
					aria-label="Search"
					type="text"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
					fullWidth
				/>

				<Button
					variant="solid"
					color="primary"
					onClick={() => {
						console.log(query);
						onSearch(query);
					}}
				>
					Search
				</Button>
			</Stack>
			
		</div>
	);
}
