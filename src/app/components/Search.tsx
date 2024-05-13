import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';

type SearchProps = {
  onSearch?: (query: string) => void;
  count?: number;
};

export default function Search(props: SearchProps) {
  let { onSearch = (query: string) => {}, count = undefined } = props;
  let [query, setQuery] = React.useState('');
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="搜索你想要知道的音乐演出"
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        count === undefined ? '搜索你想要知道的音乐演出' : count + "场相关的音乐演出"
      } </Typography>
    </div>
  );
}
