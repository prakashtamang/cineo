import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = "6778126ab7a7fa0de2ee5953683a04ed";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchSearchResults = async (query) => {
    if (query.trim() === "") {
      setResults([]); // Clear results if query is empty
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setResults(response.data.results); // Set search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSearchResults(value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for movies or TV shows..."
        value={query}
        onChange={handleInputChange}
      />
      <IoIosSearch className="icon-search" />
      {results.length > 0 && (
        <div className="results-dropdown">
          {results.map((item) => (
            <a
              key={item.id}
              href={
                item.media_type === "movie" // Check the media type
                  ? `/movie/${item.id}`
                  : `/tv/${item.id}`
              }
            >
              <div className="result-item">
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="result-image"
                />
                <div className="result-details">
                  <h4>{item.title || item.name}</h4>
                  <p>{item.media_type === "movie" ? "Movie" : "TV Show"}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
