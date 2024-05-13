'use client';
import * as React from 'react';
import { useEffect } from "react";
import Script from 'next/script';
import { CssVarsProvider } from '@mui/joy/styles';
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

export default function RentalDashboard() {
  return (
    <CssVarsProvider disableTransitionOnChange>
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
          <Search />
        </Stack>
        <Box
          sx={{
            gridRow: 'span 3',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <MapComponent />
        </Box>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            <RentalCard
              title="【大连】邓紫棋 I AM GLORIA 世界巡回演唱会-大连站"
              category="演唱会"
              hot
              image="https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01cOl2XM2GdSaxhKZvg_!!2251059038.jpg"
              artists='邓紫棋'
              platform="大麦"
              place="大连市"
              date="时间待定"
              rating={9.4}
            />
            <RentalCard
              title="【珠海】2024珠海草莓音乐节"
              category="音乐节"
              image="https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i3/2251059038/O1CN01IlV8yg2GdSaDkfA82_!!2251059038.jpg"
              artists='痛仰乐队，凤凰传奇等'
              date="2024.05.18-05.19"
              priceRange="¥328-¥698"
              platform="大麦"
              place="珠海市"
            />
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
