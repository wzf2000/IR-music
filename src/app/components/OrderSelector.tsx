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
        按{{ Relevance: '相关度', Price: '最低价', Date: '演出日期', Rating: '演出评分' }[order]}排序
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem
          {...(order === 'Relevance' && { selected: true, variant: 'soft' })}
          onClick={handleOrderChange('Relevance')}
        >
          相关度
        </MenuItem>
        <MenuItem selected={order === 'Price'} onClick={handleOrderChange('Price')}>
          最低价
        </MenuItem>
        <MenuItem selected={order === 'Date'} onClick={handleOrderChange('Date')}>
          演出日期
        </MenuItem>
        <MenuItem selected={order === 'Rating'} onClick={handleOrderChange('Rating')}>
          演出评分
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
