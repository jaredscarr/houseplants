import React from 'react'

const BASE_URL = process.env.REACT_APP_BASE_URL
// + TREFLE_TOKEN + '&q=' + query
// mock this for now with a test and see that it works

const searchBooks = ({ query }) => {
    const url = new URL(BASE_URL + 'plants/search?token=' );
    url.searchParams.append('title', query);

    return fetch(url).then(response => response.json());
}

const Search = () => {
  const [results, setResults] = React.useState(0);

  const handleSearch = (event) => {
    searchBooks(event.target.value).then(response => {
      setResults(response.docs);
    });
  };

  const resultList = (results || []).map((plant) =>
    <tr key={plant.key}>
      <td>{plant.data}</td>
    </tr>
  );

  return (
    <div>
      <div className="search-input">
        <input onChange={handleSearch} type="text" placeholder="Search"/>
      </div>
      <h1 className="h1">Search Results</h1>
      <div className="books">
        <table>
          <thead>
            <tr>
              <th className="common-name-col">Data</th>
            </tr>
          </thead>
          <tbody>{resultList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Search