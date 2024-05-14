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
  let [currentPage, setCurrentPage] = React.useState(1);
  let [totalPage, setTotalPage] = React.useState(1);
  let [order, setOrder] = React.useState('Relevance');
  const handleOnCardClick = (address: string, city: string, lng?: number, lat?: number) => {
    setAddress(address);
    setCity(city);
    setLng(lng);
    setLat(lat);
  };
  const sortByOrder = (order: string, results: SearchResult[]) => {
    switch (order) {
      case "Relevance":
        return results.sort((a, b) => {
          return b.score - a.score;
        });
        break;
      case "Price":
        return results.sort((a, b) => {
          const getLowPrice = (priceRange: string | undefined) => {
            if (priceRange === undefined || priceRange === '价格待定') return 10000000;
            let price = priceRange.split('-');
            return parseFloat(price[0]);
          };
          let priceA = getLowPrice(a.priceRange), priceB = getLowPrice(b.priceRange);
          if (priceA === priceB) {
            return b.score - a.score;
          } else {
            return priceA - priceB;
          }
        });
        break;
      case "Date":
        return results.sort((a, b) => {
          const getLeftDate = (date: string | undefined) => {
            if (date === undefined) return new Date('2070-01-01');
            // get YYYY.MM.DD
            return new Date(date.slice(0, 10));
          }
          let dateA = getLeftDate(a.date), dateB = getLeftDate(b.date);
          if (dateA === dateB) {
            return b.score - a.score;
          } else {
            return dateA.getTime() - dateB.getTime();
          }
        });
        break;
      case "Rating":
        return results.sort((a, b) => {
          let ratingA = a.rating === undefined ? 0 : a.rating, ratingB = b.rating === undefined ? 0 : b.rating;
          if (ratingA === ratingB) {
            return b.score - a.score;
          } else {
            return ratingB - ratingA;
          }
        });
        break;
    }
    return results;
  }
  const changeOrder = (order: string) => {
    setResults(sortByOrder(order, results));
    setOrder(order);
  };
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
                    let scores: number[] = [];
                    response.data.hits.hits.forEach((val: any) => {
                      scores.push(val._score);
                    })
                    console.log('scores:', scores);
                    let searchResultList: SearchResult[] = parse(response.data);
                    setResults(sortByOrder(order, searchResultList));
                    setTotalPage(Math.ceil(searchResultList.length / 5));
                    setCurrentPage(1);
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
          <Filters changeOrder={changeOrder} order={order} />
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
                  let { title, category } = val;
                  return (
                    <RentalCard
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
