import { memo, useState, useCallback } from 'react';
import { StyleSearch, StyleWrapperInput, StyleWrapperSearch } from './style';
import { SearchOutlined } from '@ant-design/icons';
import Button from 'app/components/Button';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
export const Search = memo(({ placeholder }) => {
  const [searchKey, setSearch] = useState('');
  const history = useHistory();
  const onEnterSearch = useCallback(
    event => {
      if (searchKey && event.key === 'Enter') {
        history.push({
          pathname: '/search',
          search: qs.stringify(
            { search: searchKey, page: 1 },
            {
              arrayFormat: 'bracket-separator',
              arrayFormatSeparator: '|',
              skipNull: true,
              encode: true,
            },
          ),
        });
      }
    },
    [searchKey, history],
  );

  return (
    <StyleWrapperSearch>
      <StyleWrapperInput>
        <StyleSearch
          value={searchKey}
          onChange={e => setSearch(e.target.value)}
          placeholder={placeholder || 'Searching...'}
          onKeyDown={onEnterSearch}
        />
        <Button
          className="icon-search"
          type="accent"
          onClick={() => onEnterSearch({ key: 'Enter' })}
        >
          <SearchOutlined />
        </Button>
      </StyleWrapperInput>
    </StyleWrapperSearch>
  );
});

export default Search;
