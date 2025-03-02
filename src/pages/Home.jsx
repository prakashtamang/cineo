import React from "react";
import Hero from "../components/Hero";
import TrendingSlider from "../components/TrendingSlider";
import PopularMediaSlider from "../components/PopularMediaSlider";

const Home = () => {
  return (
    <>
      <Hero />
      <TrendingSlider
        title="Trending Now"
        link=""
        endpoint="trending/all/day"
      />

      <PopularMediaSlider
        title="Popular Movies"
        link="/movies"
        endpoint="movie/popular"
      />

      <PopularMediaSlider
        title="Popular TV Shows"
        link="/movies"
        endpoint="tv/popular"
      />
    </>
  );
};

export default Home;
