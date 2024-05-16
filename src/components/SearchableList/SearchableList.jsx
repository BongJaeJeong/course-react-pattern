import { useRef, useState } from 'react';

function SearchableList({ items, itemKeyFn, children }) {
  const lastSearchTermChange = useRef();

  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item)
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase()),
  );

  // debouncing the search
  function handleChange(event) {
    if (lastSearchTermChange.current) {
      clearTimeout(lastSearchTermChange.current);
    }

    lastSearchTermChange.current = setTimeout(() => {
      lastSearchTermChange.current = null;
      setSearchTerm(event.target.value);
    }, 1000);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item, index) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchableList;
