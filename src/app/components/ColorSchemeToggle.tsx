import * as React from 'react';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode: setJoyMode } = useJoyColorScheme();
  const { setMode: setMaterialMode } = useMaterialColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        if (mode === 'light') {
          setJoyMode('dark');
          setMaterialMode('dark');
        } else {
          setJoyMode('light');
          setMaterialMode('light');
        }
        onClick?.(event);
      }}
      sx={[
        {
          '& > *:first-of-type': {
            display: mode === 'dark' ? 'none' : 'initial',
          },
          '& > *:last-of-type': {
            display: mode === 'light' ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}
