import * as React from 'react';
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

type RentalCardProps = {
  category: React.ReactNode;
  image: string;
  liked?: boolean;
  hot?: boolean;
  title: React.ReactNode;
  artists?: string;
  priceRange?: string;
  city?: string;
  address?: string;
  lng?: number,
  lat?: number,
  date?: string;
  rating?: number;
  platform: string;
  handleOnCardClick?: (address: string, city: string, lng?: number, lat?: number) => void;
};

export default function RentalCard(props: RentalCardProps) {
  const { category, title, artists = '群星', hot = false, liked = false, image, priceRange = '价格待定', city = '城市未知', address = '地点待确定', lng = undefined, lat = undefined, date = '日期未确定', rating = -1, platform, handleOnCardClick = (address: string, city: string, lng?: number, lat?: number) => {} } = props;
  const [isLiked, setIsLiked] = React.useState(liked);
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
          <img src={image} alt="" />
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
            <Typography level="body-sm">{category}</Typography>
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
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
            <strong>{priceRange}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
