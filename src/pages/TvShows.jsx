import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";

const TvShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity-desc");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const API_KEY = "6778126ab7a7fa0de2ee5953683a04ed";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch genres dynamically
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
          params: {
            api_key: API_KEY,
          },
        });
        setGenres(response.data.genres); // Set genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch TV Show with sorting and filtering
  const fetchTVShows = async (pageNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          page: pageNumber,
          sort_by: sortBy,
          with_genres: selectedGenres.join(","),
        },
      });
      if (pageNumber === 1) {
        setTVShows(response.data.results);
      } else {
        setTVShows((prevTVShows) => [...prevTVShows, ...response.data.results]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };

  // Fetch TV Show when the component mounts or page changes
  useEffect(() => {
    setPage(1);
    fetchTVShows(1);
  }, [sortBy, selectedGenres]);

  // Load more TV Shows
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle genre selection
  // const handleGenreChange = (genreId) => {
  //   if (selectedGenres.includes(genreId)) {
  //     setSelectedGenres(selectedGenres.filter((id) => id !== genreId)); // Remove genre
  //   } else {
  //     setSelectedGenres([...selectedGenres, genreId]); // Add genre
  //   }
  // };

  // Handle genre selection
  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );
    setSelectedGenres(selectedOptions);
  };

  if (loading && page === 1) {
    return <Spinner />;
  }
  return (
    <>
      <div className="media-page">
        <div className="container">
          <div className="results">
            <h1>Watch TV Shows Online</h1>
            <p>
              Your life might not align with what you want the TV series
              broadcaster's schedule to be. A meeting goes late in to the night
              or the kids have a big game that you cannot miss. But there is a
              show you want to watch. What is a person supposed to do to watch
              TV shows online?
            </p>
            <div className="sort-filter">
              <div className="sorts">
                <label htmlFor="filter">Sort By: </label>
                <select
                  name="filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity.desc">
                    Popularity (Descending)
                  </option>
                  <option value="popularity.asc">Popularity (Ascending)</option>
                  <option value="release_date.desc">
                    Release Date (Newest)
                  </option>
                  <option value="release_date.asc">
                    Release Date (Oldest)
                  </option>
                  <option value="vote_average.desc">Rating (Highest)</option>
                  <option value="vote_average.asc">Rating (Lowest)</option>
                </select>
              </div>
              <div className="filters">
                <label htmlFor="genre">Genres: </label>
                <select
                  name="genre"
                  value={selectedGenres}
                  onChange={handleGenreChange}
                >
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                {/* {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreChange(genre.id)}
                >
                  {genre.name}
                </button>
              ))} */}
              </div>
            </div>

            <div className="media-wrapper mt-4">
              {tvShows.map((movie) => (
                <div className="movie">
                  <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="poster img-fluid"
                    />
                    <div className="content">
                      <div className="movie-name">
                        {movie.title || movie.name}
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="load-more d-flex justify-content-center mt-4">
              <button onClick={handleLoadMore}>Load More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShows;
