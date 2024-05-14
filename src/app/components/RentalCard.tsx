import * as React from 'react';
import Image from 'next/image';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Rating from '@mui/material/Rating';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VerifiedIcon from '@mui/icons-material/Verified';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { pink, yellow } from '@mui/material/colors';

import { SearchResult } from '../utils/types';

type RentalCardProps = {
  data: SearchResult;
  category: React.ReactNode;
  liked?: boolean;
  title: React.ReactNode;
  handleOnCardClick?: (address: string, city: string, lng?: number, lat?: number) => void;
};

export default function RentalCard(props: RentalCardProps) {
  const { category, title, data, handleOnCardClick = (address: string, city: string, lng?: number, lat?: number) => {}, liked = false } = props;
  const { artists = '群星', hot = false, generalAgent = false, image, priceRange = '价格待定', city = '城市未知', address = '地点待确定', lng = undefined, lat = undefined, date = '时间待定', rating = -1, platform } = data;
  // const [isLiked, setIsLiked] = React.useState(liked);
  let wantDesc: React.ReactNode | null = null;
  if (data.wantDesc !== undefined) {
    // 超过XX%同类演出
    const pattern = new RegExp(/超过\d+%同类演出/);
    // if matched, replace XX% with other color
    if (pattern.test(data.wantDesc)) {
      const percent = data.wantDesc.match(/\d+/);
      if (percent !== null) {
        wantDesc = (
          <Typography level="body-md" sx={{ textAlign: 'left', fontWeight: 500, ml: 0.5 }}>
            {' · 超过'}
            <Typography level="body-md" sx={{ color: yellow[800], fontWeight: 700 }}>
              {percent[0]}%
            </Typography>
            {'同类演出'}
          </Typography>
        );
      }
    } else {
      wantDesc = (
        <Typography level="body-md" sx={{ textAlign: 'left', fontWeight: 500, ml: 0.5 }}>
          {' · ' + data.wantDesc}
        </Typography>
      );
    }
  }
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
          '--AspectRatio-radius': {
            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <Image src={image} alt="" fill={true} />
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
          >
            {hot && (
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WhatshotIcon />}
                size="md"
              >
                火爆
              </Chip>
            )}
            {/* <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                ml: 'auto',
                borderRadius: '50%',
                zIndex: '20',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton> */}
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Stack spacing={1} direction="row" sx={{ mt: 'auto' }}>
              <Typography level="body-sm">{category}</Typography>
              {
                generalAgent && (
                  <Chip variant="outlined" color="primary" size="md" startDecorator={<SupportAgentIcon />} sx={{ color: 'text.secondary' }}>
                    总票代
                  </Chip>
                )
              }
            </Stack>
            <Typography level="title-md">
              <Link
                overlay
                underline="none"
                onClick={() => handleOnCardClick(address, city, lng, lat)}
                sx={{ color: 'text.primary' }}
              >
                {title}
              </Link>
            </Typography>
          </div>
          {/* <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? 'danger' : 'neutral'}
            onClick={() => setIsLiked((prev) => !prev)}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              borderRadius: '50%',
            }}
          >
            <FavoriteRoundedIcon />
          </IconButton> */}
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          <Typography level="body-xs" startDecorator={<VerifiedIcon />}>
            {artists}
          </Typography>
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            {city}
          </Typography>
          <Typography level="body-xs" startDecorator={<EventAvailableIcon />}>
            {date}
          </Typography>
          <Typography level="body-xs" startDecorator={<ConfirmationNumberIcon />}>
            {platform}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 'auto' }}>
          <Typography
            level="title-sm"
            startDecorator={
              <React.Fragment>
                <Rating
                  name="text-feedback"
                  value={rating == -1 ? 0 : rating / 2}
                  precision={0.1}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                />
              </React.Fragment>
            }
            sx={{ display: 'flex', gap: 1 }}
          >
            {rating == -1 ? "暂无评分" : rating.toFixed(1)}
          </Typography>
          {
            data.wantNum !== undefined && (
              <Typography level="title-md" startDecorator={<FavoriteIcon sx={{ color: pink[500] }} />} sx={{ textAlign: 'right', color: yellow[800], ml: 3, fontWeight: 700 }}>
                {data.wantNum}
              </Typography>
            )
          }
          {
            data.wantNumSuffix !== undefined && (
              <Typography level="body-md" sx={{ textAlign: 'center', fontWeight: 500 }}>
                {data.wantNumSuffix + '想看'}
              </Typography>
            )
          }
          {
            data.wantDesc !== undefined && wantDesc
          }
          {/* {
            wantText !== null ? (
              <Typography level="body-xs" startDecorator={<FavoriteIcon sx={{ color: pink[500] }} />} sx={{ display: 'flex', flexGrow: 2, textAlign: 'center' }}>
                {wantText}
              </Typography>
            ) : null
          } */}
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
            <strong>￥{priceRange}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
