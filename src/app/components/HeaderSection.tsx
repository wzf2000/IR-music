import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

type HeaderSectionProps = {
  title: string,
  subtitle: string,
};

export default function HeaderSection(props: HeaderSectionProps) {
  const { title, subtitle } = props;
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <Typography level="h2">{title}</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        {subtitle}
      </Typography>
    </Stack>
  );
}
