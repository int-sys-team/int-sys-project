import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

interface OrderSelectorProps {
  onSelect: (order: string) => void;
 }

export default function OrderSelector({ onSelect }: OrderSelectorProps) {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Order by
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem onClick={() => onSelect("Price")}>Price</MenuItem>
        <MenuItem onClick={() => onSelect("Latest Date")}>Latest Date</MenuItem>
      </Menu>
    </Dropdown>
  );
}
