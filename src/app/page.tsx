'use client';
import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Script from 'next/script';
import {
  extendTheme as joyExtendTheme,
  CssVarsProvider as JoyCssVarsProvider,
  THEME_ID as JOY_THEME_ID,
} from '@mui/joy/styles';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';

import NavBar from '@/app/components/NavBar';
import ConcertCard from '@/app/components/ConcertCard';
import HeaderSection from '@/app/components/HeaderSection';
import Search from '@/app/components/Search';
import Filters from '@/app/components/Filters';
import Pagination from '@/app/components/Pagination';
import MapComponent from '@/app/components/MapContainer';

import { search } from '@/app/utils/network';
import { parse } from '@/app/utils/parse';
import { sortByOrder, filterByDate, filterByPrice, filterByCity } from '@/app/utils/process';
import { SearchResult, CityType } from '@/app/utils/types';

const joyTheme = joyExtendTheme();

type AsyncResylts = {
  value: SearchResult[];
  status: 'idle' | 'pending' | 'resolved';
};

export default function ConcertDashboard() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [order, setOrder] = useState('Relevance');
  const [filterCity, setFilterCity] = useState<CityType>({ code: '000000', label: '所有城市', province: '所有城市'});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(5000);
  const asyncResults: AsyncResylts = useMemo(() => ({
    value: [],
    status: 'idle',
  }), [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps
  const results = useMemo(() => {
    const searchResultList = sortByOrder(filterByPrice(filterByDate(filterByCity(asyncResults.value, filterCity), startDate, endDate), priceLow, priceHigh), order);
    setTotalPage(Math.ceil(searchResultList.length / 5));
    setCurrentPage(1);
    return searchResultList;
  }, [asyncResults.value, order, filterCity, startDate, endDate, priceLow, priceHigh]);
  const handleOnCardClick = (address: string, city: string, lng?: number, lat?: number) => {
    setAddress(address);
    setCity(city);
    setLng(lng);
    setLat(lat);
  };
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  );
  const onSearch = (query: string) => {
    if (searchParams.get('query') !== query) {
      console.log('pushing new query to history');
      router.push(pathname + '?' + createQueryString('query', query));
      setSearched(false);
    }
  };

  useEffect(() => {
    if (asyncResults.status !== 'idle') {
      return;
    }

    const fetchData = async () => {
      asyncResults.status = 'pending';
      const query = searchParams.get('query');
      if (query === null) {
        asyncResults.value = [];
        asyncResults.status = 'resolved';
        return;
      }
      asyncResults.value = await search(query).then(
        (response) => {
          if (response) {
            const searchResultList: SearchResult[] = parse(response.data);
            return searchResultList;
          }
          return [];
        }
      ).catch((error) => {
        console.error('Error:', error);
        return [];
      }).finally(() => {
        setSearched(true);
      });
      asyncResults.status = 'resolved';
    };
    fetchData();
  }, [asyncResults]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchParams.has('query')) {
      const queryParam = searchParams.get('query');
      if (queryParam !== null && queryParam !== query) {
        console.log('query changed to', queryParam);
        setQuery(queryParam);
      }
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <JoyCssVarsProvider theme={{ [JOY_THEME_ID]: joyTheme }} disableTransitionOnChange>
    <MaterialCssVarsProvider>
      <CssBaseline enableColorScheme />
      <Script src="https://webapi.amap.com/maps?v=1.4.15&key=c9020fcf56e3d78809895825c68f439e&callback=init"></Script>
      <CssBaseline />
      <NavBar title="Music Search" handleClickIcon={() => {
        console.log('Do nothing');
      }} />
      <Box
        component="main"
        sx={{
          height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
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
          <HeaderSection title="音乐演出检索" subtitle="一键搜索你想去的演唱会、音乐节~" />
          <Search
            placeholder="搜索你想要知道的音乐演出"
            query={query}
            setQuery={setQuery}
            onSearch={onSearch}
            count={searched ? results.length : undefined}
            countSuffix=" 场相关的音乐演出"
          />
        </Stack>
        <Box
          sx={{
            gridRow: 'span 3',
            display: { xs: 'none', md: 'flex' },
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
          }}
        >
          <MapComponent address={address} city={city} lng={lng} lat={lat} />
        </Box>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters
            order={order} setOrder={setOrder}
            city={filterCity} setCity={setFilterCity}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            priceLow={priceLow} setPriceLow={setPriceLow}
            priceHigh={priceHigh} setPriceHigh={setPriceHigh}
          />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            {
              results.length === 0 ? (
                searched ? (
                  <p>无符合的搜索结果</p>
                ) : (
                  <p>搜索你想要知道的音乐演出</p>
                )
              ) : (
                results.slice(currentPage * 5 - 5, currentPage * 5).map((val, ind) => {
                  const { title, category } = val;
                  return (
                    <ConcertCard
                      key={ind}
                      data={val}
                      title={title}
                      category={category}
                      handleOnCardClick={handleOnCardClick}
                    />
                  );
                })
              )
            }
          </Stack>
        </Stack>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={(page) => {
            console.log('page changed to', page);
            setCurrentPage(page);
          }}
        />
      </Box>
    </MaterialCssVarsProvider>
    </JoyCssVarsProvider>
  );
}
