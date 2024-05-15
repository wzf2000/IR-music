import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';

type SearchProps = {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
  onSearch?: (query: string) => void;
  count?: number;
  countSuffix: string;
};

export default function Search(props: SearchProps) {
  const { onSearch = (query: string) => {}, count = undefined, placeholder, countSuffix, query, setQuery } = props;
  // const [query, setQuery] = React.useState('');
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder={placeholder}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSearch(query);
              }
            }}
          />
        </FormControl>
        <Button
          variant="solid"
          color="primary"
          onClick={ () => {
            onSearch(query);
          } }
        >
          搜索
        </Button>
      </Stack>
      <Typography level="body-sm"> {
        count === undefined ? placeholder : count + countSuffix
      } </Typography>
    </div>
  );
}
