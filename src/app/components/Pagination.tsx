import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  let { currentPage, totalPage, onPageChange } = props;
  let pageList = [];
  if (totalPage <= 7) {
    pageList = Array.from({ length: totalPage }, (_, i) => (i + 1).toString());
  } else {
    if (currentPage < 4) {
      pageList = ['1', '2', '3', '4', '…', totalPage.toString()];
    } else if (currentPage > totalPage - 3) {
      pageList = ['1', '…', (totalPage - 3).toString(), (totalPage - 2).toString(), (totalPage - 1).toString(), totalPage.toString()];
    } else {
      pageList = ['1', '…', (currentPage - 1).toString(), currentPage.toString(), (currentPage + 1).toString(), '…', totalPage.toString()];
    }
  }
  return (
    <div>
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          mx: 2,
          my: 1,
        }}
      >
        {
          currentPage > 1 ? (
            <IconButton
              aria-label="previous page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
          ) : null
        }
        <Typography level="body-sm" mx="auto">
          Page {currentPage} of {totalPage}
        </Typography>
        {
          currentPage < totalPage ? (
            <IconButton
              aria-label="next page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          ) : null
        }
        
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
          mx: 4,
          my: 2,
        }}
      >
        {
          currentPage > 1 ? (
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              startDecorator={<ArrowBackIosRoundedIcon />}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
          ) : null
        }

        <Box sx={{ flex: 1 }} />
        {pageList.map((page: string, index: number) => (
          <IconButton
            key={index}
            size="sm"
            variant={Number(page) ? 'plain' : 'soft'}
            disabled={!Number(page)}
            color={Number(page) && Number(page) === currentPage ? 'neutral' : 'primary'}
            onClick={() => {
              if (Number(page) === currentPage) return;
              onPageChange(Number(page));
            }}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        {
          currentPage < totalPage ? (
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              endDecorator={<ArrowForwardIosRoundedIcon />}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          ) : null
        }
      </Box>
    </div>
  );
}
