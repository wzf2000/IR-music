import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

type OrderSelectorProps = {
  changeOrder: (order: string) => void;
  order: string;
};

export default function OrderSelector(props: OrderSelectorProps) {
  const { changeOrder, order } = props;
  const handleOrderChange = (newOrder: string) => () => {
    if (typeof newOrder === 'string') {
      changeOrder(newOrder);
    }
  }
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
        <MenuItem
          {...(order === 'Relevance' && { selected: true, variant: 'soft' })}
          onClick={handleOrderChange('Relevance')}
        >
          Relevance
        </MenuItem>
        <MenuItem selected={order === 'Price'} onClick={handleOrderChange('Price')}>
          Price
        </MenuItem>
        <MenuItem selected={order === 'Date'} onClick={handleOrderChange('Date')}>
          Date
        </MenuItem>
        <MenuItem selected={order === 'Rating'} onClick={handleOrderChange('Rating')}>
          Rating
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
