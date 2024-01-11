import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import TextField from '@mui/material/TextField';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import ZipSelector from './ZipSelector';
import OrderSelector from './OrderSelector';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { margin } from '@mui/system';

function valueText(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

interface FiltersProps {
  onSelect: (order: string) => void;
  onChosen: (zipcode: number|undefined|null, startYear: number, endYear: number, startPrice: number, endPrice: number) => void;
 }

export default function Filters({ onSelect, onChosen }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const [selectedZip, setSelectedZip] = useState<number | null>(null);
  const [startYear, setStartYear] = useState<number>(1905);
  const [endYear, setEndYear] = useState<number>(2012);
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(5000000);

  const filerProperties = () => {
    console.log(selectedZip)
    console.log(startYear)
    console.log(endYear)
    console.log(startPrice)
    console.log(endPrice)
    onChosen(selectedZip, startYear, endYear, startPrice, endPrice);
    setOpen(false);
  }

  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: 'space-between' }}
      flexWrap="wrap"
      sx={{ minWidth: 0 }}
    >
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<FilterAltOutlined />}
        onClick={() => setOpen(true)}
      >
        Filters
      </Button>
      <OrderSelector onSelect={onSelect} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <ZipSelector onChange={setSelectedZip} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto',
              gap: 1,
            }}
          >
            <FormLabel htmlFor="filters-start-date">Start year built</FormLabel>
            <Input 
            type="number" 
            placeholder="Type in here…" 
            variant="outlined" 
            color="primary" 
            onChange={(event) => setStartYear(Number(event.target.value))}
            />
            <div />
            <FormLabel htmlFor="filters-end-date">End year built</FormLabel>
            <Input 
            type="number" 
            placeholder="Type in here…" 
            variant="outlined" 
            color="primary" 
            onChange={(event) => setEndYear(Number(event.target.value))}
            />
          </Box>
          <FormControl sx={{ px: 2.7 }}>
            <FormLabel>Price range</FormLabel>
            <Slider
              defaultValue={[330000, 550000]}
              step={10000}
              min={100000}
              max={1000000}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              marks={[
                { value: 100000, label: '$100,000' },
                { value: 500000, label: '$500,000' },
                { value: 1000000, label: '$1,000,000' },
              ]}
              sx={{
                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                  transform: 'none',
                },
                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                  transform: 'translateX(-100%)',
                }
              }}
              onChange={(event, newValue) => {
                setStartPrice(newValue[0]);
                setEndPrice(newValue[1]);
              }}
            />
          </FormControl>
        <Button onClick={filerProperties} style={{marginTop:"25px", width:"50%", alignSelf:"center"}}>
          Filter
        </Button>
        </Stack>
      </Drawer>
    </Stack>
  );
}
