import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const MediaDetails = () => {
  const { id, type } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "6778126ab7a7fa0de2ee5953683a04ed";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    // Fetch details based on the type (movie or TV show)
    const endpoint = type === "movie" ? "movie" : "tv";
    axios
      .get(`${BASE_URL}/${endpoint}/${id}?api_key=${API_KEY}`)
      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setLoading(false);
      });
  }, [id, type]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!details) return <div>Error loading details.</div>;

  return (
    <div className="media-details">
      <div className="background">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt=""
          className="img-fluid"
        />
      </div>
      <div className="content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="poster d-flex justify-content-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title || details.name}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-6">
              <div className="details mt-4 mt-sm-0">
                <h1 className="title">{details.title || details.name}</h1>
                <div className="overview">
                  <p>{details.overview}</p>
                </div>
                <div className="release-date">
                  <p>
                    {type === "movie" ? "Release Date" : "First Air Date"}:{" "}
                    {details.release_date || details.first_air_date}
                  </p>
                </div>
                <div className="rating">
                  <p>Rating: {details.vote_average}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
