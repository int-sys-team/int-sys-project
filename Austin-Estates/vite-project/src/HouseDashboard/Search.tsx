import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';
import { TextField } from '@mui/material';

type searchProps = {
  onSearch: (query:string) => any;
}

export default function Search(props: searchProps) {
  const { onSearch } = props;
  const [query, setQuery] = React.useState<string>('');
  const queryRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
          <Input
            placeholder="Search"
            ref={queryRef}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            type='text'
            value={query}
            onChange={(e) => {
              //console.log(e.target.value);
              setQuery(e.target.value);
            }}
          />
        
        <Button variant="solid" color="primary"
          onClick={() => {
            if(queryRef.current){
              // FIXME: Ovo je samo example inace ne radi
              console.log(query);
              onSearch(
					'I want an apartment with at least two bedrooms that costs less than 500000 dollars'
				);
              
            }
          }}
        >
          Search
        </Button>
      </Stack>
      <Typography level="body-sm">232 stays in Melbourne, Australia</Typography>
    </div>
  );
}
