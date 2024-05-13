'use client';
import * as React from 'react';
import Script from 'next/script';
import {
  extendTheme as joyExtendTheme,
  CssVarsProvider as JoyCssVarsProvider,
  THEME_ID as JOY_THEME_ID,
} from '@mui/joy/styles';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import NavBar from './components/NavBar';
import RentalCard from './components/RentalCard';
import HeaderSection from './components/HeaderSection';
import Search from './components/Search';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import MapComponent from './components/MapContainer';

import { search } from './utils/network';
import { SearchResult } from './utils/types';
import { parse } from './utils/parse';

const joyTheme = joyExtendTheme();

export default function RentalDashboard() {
  let [city, setCity] = React.useState('');
  let [address, setAddress] = React.useState('');
  let [lng, setLng] = React.useState<number | undefined>(undefined);
  let [lat, setLat] = React.useState<number | undefined>(undefined);
  let [results, setResults] = React.useState<SearchResult[]>([]);
  let [searched, setSearched] = React.useState(false);
  const handleOnCardClick = (address: string, city: string, lng?: number, lat?: number) => {
    setAddress(address);
    setCity(city);
    setLng(lng);
    setLat(lat);
  }
  return (
    <JoyCssVarsProvider theme={{ [JOY_THEME_ID]: joyTheme }} disableTransitionOnChange>
    <MaterialCssVarsProvider>
      <CssBaseline enableColorScheme />
      <Script src="https://webapi.amap.com/maps?v=1.4.15&key=c9020fcf56e3d78809895825c68f439e&callback=init"></Script>
      <CssBaseline />
      <NavBar />
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
          <HeaderSection />
          <Search
            onSearch={
              (query: string) => {
                console.log('searching for', query);
                search(query).then((response) => {
                  if (response) {
                    console.log('response[0]:', response.data.hits.hits[0]);
                    let searchResultList: SearchResult[] = parse(response.data);
                    setResults(searchResultList);
                  }
                  setSearched(true);
                });
              }
            }
            count={searched ? results.length : undefined}
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
          <Filters />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            {
              results.length === 0 ? (
                searched ? (
                  <p>无符合的搜索结果</p>
                ) : (
                  <p>搜索你想要知道的音乐演出</p>
                )
              ) : (
                results.map((val, ind) => {
                  let { title, category, hot = false, image, artists = undefined, date = undefined, platform, city = undefined, address = undefined, lng = undefined, lat = undefined, rating = undefined, priceRange = undefined } = val;
                  return (
                    <RentalCard
                      title={title}
                      category={category}
                      hot={hot}
                      image={image}
                      artists={artists}
                      date={date}
                      platform={platform}
                      city={city}
                      address={address}
                      rating={rating}
                      priceRange={priceRange}
                      handleOnCardClick={handleOnCardClick}
                    />
                  );
                })
              )
            }
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </MaterialCssVarsProvider>
    </JoyCssVarsProvider>
  );
}
