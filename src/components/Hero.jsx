import React from "react";
import heroBg from "../assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <img src={heroBg} alt="" />
      <div className="container">
        <div className="row">
          <div className="hero-content col-12 col-lg-8">
            <h1>
              <span className="first-line">All Your Streaming Services</span>
              <br /> <span className="second-line">in One Place</span>
            </h1>
            <h2 className="mt-3">
              Your Streaming Movie & TV Guide. Track, discover and find where to
              watch TV shows and movies from Netflix, Apple TV+, Amazon Prime,
              Hulu, Paramount+ and over 100 more services.
            </h2>
            <div>
              <a href="#" className="btn-cta me-4">
                How it works
              </a>
              <a href="#" className="btn-cta">
                Start a watchlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
