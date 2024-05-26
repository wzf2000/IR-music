import * as React from 'react';
import { Box, IconButton } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ColorSchemeToggle from './ColorSchemeToggle';

type NavBarProps = {
  title: string;
  handleClickIcon: () => void;
};

export default function NavBar(props: NavBarProps) {
  const { title, handleClickIcon } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 1000,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft" onClick={handleClickIcon}>
          <LibraryMusicIcon />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
    </Box>
  );
}
