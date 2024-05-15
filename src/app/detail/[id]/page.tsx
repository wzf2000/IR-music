"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import {
  extendTheme as joyExtendTheme,
  CssVarsProvider as JoyCssVarsProvider,
  THEME_ID as JOY_THEME_ID,
} from "@mui/joy/styles";
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from "@mui/material/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Chip from "@mui/joy/Chip";
import CssBaseline from "@mui/joy/CssBaseline";
import IconButton from "@mui/joy/IconButton";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import NavBar from "@/app/components/NavBar";

import { document } from "@/app/utils/network";
import { parseDetail } from "@/app/utils/parse";
import { DetailResult } from "@/app/utils/types";

const joyTheme = joyExtendTheme();

export default function ConcertDetail({ params }: { params: { id: string } }) {
  const [detailData, setDetailData] = useState<DetailResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  const router = useRouter();
  useEffect(() => {
    document(params.id).then((response) => {
      if (response) {
        setDetailData(parseDetail(response.data));
      }
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [router, params.id]);
  return (
    <JoyCssVarsProvider
      theme={{ [JOY_THEME_ID]: joyTheme }}
      disableTransitionOnChange
    >
    <MaterialCssVarsProvider>
      <CssBaseline enableColorScheme />
      <NavBar title="Music Search" handleClickIcon={() => {
        router.push("/");
      }} />
      <Box
        component="main"
        sx={{
          height: "calc(100vh - 55px)", // 55px is the height of the NavBar
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "100%" },
          gridTemplateRows: "auto 1fr auto",
        }}
      >
      <Stack
        alignItems="center"
        sx={{
          backgroundColor: 'background.surface',
          px: { xs: 2, md: 4 },
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          height: "100%",
        }}
      >
        {
          loading ? (
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Typography textAlign="left" fontSize="30px" fontWeight={500} fontFamily="" height="55px" lineHeight="55px" m={0} p={0} sx={{
                verticalAlign: 'middle',
              }}>
                Loading data...
              </Typography>
            </Stack>
          ) : (
            detailData === null ? (
              <Stack
                display="flex"
                flexDirection="row"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <Typography textAlign="right" fontSize="24px" fontWeight={700} mr="20px" p="10px 23px 10px 0" borderRight="1px solid rgba(0, 0, 0,.3)">
                  404
                </Typography>
                <Typography textAlign="left" fontSize="14px" fontWeight={500} fontFamily="" height="55px" lineHeight="55px" m={0} p={0} sx={{
                  verticalAlign: 'middle',
                }}>
                  ID {params.id} Not Found
                </Typography>
              </Stack>
            ) : (
              <Stack
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
                width="65%"
              >
              <Stack
                spacing={5}
                alignItems="center"
                width="100%"
                sx={{
                  backgroundColor: 'background.surface',
                  px: { xs: 2, md: 4 },
                  py: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack
                  spacing={5}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  width="100%"
                >
                  <AspectRatio
                    ratio="20 / 27"
                    flex
                    sx={{
                      minWidth: { sm: 120, md: 160 },
                      '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
                    }}
                  >
                    <Image fill={true} src={detailData.projectImgs[0]} alt={detailData.title} onClick={() => setOpenId(0)} />
                  </AspectRatio>
                  <Stack
                    spacing={1}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      {
                        detailData.isGeneralAgent && (
                          <Chip variant="solid" color="danger" size="sm" startDecorator={<SupportAgentIcon />} sx={{
                            fontWeight: 900,
                          }}>
                            总票代
                          </Chip>
                        )
                      }
                      <Typography level="title-lg">
                        【{detailData.city}】{detailData.title}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="title-sm" fontWeight={700}>
                        演出类型：
                      </Typography>
                      <Typography level="title-sm">
                        {detailData.category}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        售票平台：
                      </Typography>
                      {
                        detailData.projectLink === null ? (
                          <Typography level="body-sm">
                            {detailData.platform}
                          </Typography>
                        ) : (
                          <a href={detailData.projectLink} target='_blank'>
                          <Button size='sm'>
                            {detailData.platform}
                          </Button>
                          </a>

                        )
                      }
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        时间：
                      </Typography>
                      <Typography level="body-sm">
                        {detailData.showTime}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        场馆：
                      </Typography>
                      <Typography level="body-sm">
                        {detailData.city} | {detailData.venueName}
                      </Typography>
                      {
                        detailData.lng !== null && detailData.lat !== null && detailData.venueAddress !== null && (
                          <a href={`https://ditu.amap.com/regeo?lng=${detailData.lng}&lat=${detailData.lat}&name=${detailData.venueAddress}`} target="_blank">
                            <IconButton size="sm">
                              <Image
                                src="/marker.svg"
                                alt="Map"
                                width={15}
                                height={15}
                              />
                            </IconButton>
                          </a>
                        )
                      }
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        状态：
                      </Typography>
                      <Typography level="body-sm">
                        {detailData.showStatus}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        演出音乐人：
                      </Typography>
                      <Typography level="body-sm">
                        {detailData.artists.length !== 0 ? detailData.artists.join(" / ") : "以现场为准"}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography level="body-lg" fontWeight={700}>
                        售票价格：
                      </Typography>
                      <Typography level="body-lg" fontWeight={700} color="danger">
                        {detailData.price === "价格待定" ? detailData.price : `¥${detailData.price}`}
                      </Typography>
                    </Stack>
                    { detailData.tours.length > 0 && (
                      <Stack
                        spacing={0.5}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Typography level="body-lg" fontWeight={700}>
                          城市：
                        </Typography>
                        <Stack
                          spacing={0.5}
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          {
                            Array.from({ length: Math.ceil(detailData.tours.length / 5) }, (_, i) => (i + 1).toString()).map((val, ind) => (
                              <ButtonGroup
                                key={val}
                                variant="outlined"
                              >
                                {
                                  detailData.tours.slice(ind * 5, ind * 5 + 5).map((tour) => (
                                    <Button key={tour.itemId} disabled={tour.itemId === params.id} sx={{
                                      fontSize: '13px',
                                    }} onClick={
                                      () => {
                                        console.log("Clicked", tour.itemId, "jumping to", tour.city, "...");
                                        router.push(`/detail/${tour.itemId}`);
                                      }
                                    }>
                                      {tour.city}<br></br>{tour.showTime}
                                    </Button>
                                  ))
                                }
                              </ButtonGroup>
                            ))
                          }
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                spacing={5}
                alignItems="center"
                sx={{
                  backgroundColor: 'background.surface',
                  px: { xs: 2, md: 4 },
                  py: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography level="body-lg" fontWeight={700} fontSize={30}>
                  演出介绍
                </Typography>
                {
                  detailData.projectImgs.length > 1 && (
                    <div>
                      <ImageList sx={{ width: "100%", height: 500 }} variant="woven" cols={3} gap={8}>
                        {detailData.projectImgs.slice(1).map((item, ind) => (
                          <ImageListItem key={item}>
                            <img // eslint-disable-line @next/next/no-img-element
                              srcSet={`${item}?w=164&h=164&fit=crop&auto=format 2x`}
                              src={`${item}?w=164&h=164&fit=crop&auto=format`}
                              alt={ind.toString()}
                              loading="lazy"
                              onClick={() => setOpenId(ind + 1)}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                      <Modal
                        open={openId !== null}
                        onClose={() => setOpenId(null)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <ModalDialog layout="center" sx={{
                          maxHeight: "85%",
                        }}>
                          <ModalClose onClick={() => setOpenId(null)} />
                          {
                            openId !== null &&
                              <div style={{
                                display: 'flex',
                                overflowY: 'auto',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                              }}>
                                <img // eslint-disable-line @next/next/no-img-element
                                  width="95%"
                                  height="auto"
                                  src={detailData.projectImgs[openId]}
                                  alt={detailData.title}
                                />
                              </div>
                          }
                        </ModalDialog>
                      </Modal>
                    </div>
                  )
                }
                {
                  detailData.projectInfo === "" ? (
                    <Typography level="body-md" fontSize={20}>
                      暂无介绍
                    </Typography>
                  ) : (
                    <Typography level="body-sm" fontSize={15} whiteSpace="pre-line">
                      {detailData.projectInfo}
                    </Typography>
                  )
                }
              </Stack>
              </Stack>
            )
          )
        }
        </Stack>
      </Box>
    </MaterialCssVarsProvider>
    </JoyCssVarsProvider>
  );
}
