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

import CitySelector from '@/app/components/CitySelector';
import OrderSelector from '@/app/components/OrderSelector';

import { CityType } from '@/app/utils/types';

type FiltersProps = {
  order: string;
  setOrder: (order: string) => void;
  city: CityType;
  setCity: (city: CityType) => void;
  startDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  endDate: Date | null;
  setEndDate: (endDate: Date | null) => void;
  priceLow: number;
  setPriceLow: (priceLow: number) => void;
  priceHigh: number;
  setPriceHigh: (priceHigh: number) => void;
};

function valueText(value: number) {
  return `￥${value.toLocaleString('zh-CN')}`;
}

export default function Filters(props: FiltersProps) {
  const { setOrder, order, city, setCity, startDate, setStartDate, endDate, setEndDate, priceLow, setPriceLow, priceHigh, setPriceHigh } = props;
  const [open, setOpen] = React.useState(false);
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
        筛选
      </Button>
      <OrderSelector order={order} setOrder={setOrder} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>筛选</DialogTitle>
          <ModalClose />
          <CitySelector city={city} setCity={setCity} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto',
              gap: 1,
            }}
          >
            <FormLabel htmlFor="filters-start-date">开始日期</FormLabel>
            <div />
            <FormLabel htmlFor="filters-end-date">结束日期</FormLabel>

            <Input
              id="filters-start-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
              value={startDate?.toISOString()?.slice(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <Box sx={{ alignSelf: 'center' }}>-</Box>
            <Input
              id="filters-end-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
              value={endDate?.toISOString()?.slice(0, 10)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </Box>
          <FormControl>
            <FormLabel>价格区间</FormLabel>
            <Slider
              defaultValue={[0, 5000]}
              step={50}
              min={0}
              max={5000}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              value={[priceLow, priceHigh]}
              onChange={(_, newValue, activeThumb) => {
                if (activeThumb === 0) {
                  if (typeof newValue === 'number') {
                    setPriceLow(newValue);
                  } else {
                    setPriceLow(newValue[0]);
                  }
                } else {
                  if (typeof newValue === 'number') {
                    setPriceHigh(newValue);
                  } else {
                    setPriceHigh(newValue[1]);
                  }
                }
              }}
              marks={[
                { value: 0, label: '￥0' },
                { value: 500, label: '￥500' },
                { value: 3000, label: '￥3,000' },
                { value: 5000, label: '￥5,000' },
              ]}
              sx={{
                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                  transform: 'translateX(-50%)',
                },
                [`& .${sliderClasses.markLabel}[data-index="1"]`]: {
                  transform: 'translateX(-40%)',
                },
                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                  transform: 'translateX(-60%)',
                },
                [`& .${sliderClasses.markLabel}[data-index="3"]`]: {
                  transform: 'translateX(-70%)',
                },
              }}
            />
          </FormControl>
        </Stack>
      </Drawer>
    </Stack>
  );
}
