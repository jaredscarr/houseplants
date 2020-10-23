import React, { useState } from 'react'

const BASE_URL = process.env.REACT_APP_BASE_URL

const searchPlants = (query) => {
    const url = new URL(BASE_URL + 'plants/search' );
    const token = localStorage.getItem('trefleJwtToken');

    url.searchParams.append('q', query);
    return fetch(url,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then(response => response.json());
}

const Search = () => {
  const [results, setResults] = useState(0);
  
  const handleSearch = (event) => {
    searchPlants(event.target.value).then(response => {
      setResults(response.data);
    });
  };

  const resultList = (results || []).map((plant) =>
    <tr key={plant.id}>
      <td>{plant.common_name}</td>
    </tr>
  );

  return (
    <div>
      <div className="search-input">
        <input onChange={handleSearch} type="text" placeholder="Search"/>
      </div>
      <h1 className="h1">Search Results</h1>
      <div className="plants">
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

export default Search;