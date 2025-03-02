import React, { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { NavLink } from "react-router-dom";

const TrendingSlider = ({ title, link, endpoint }) => {
  const [data, setData] = useState([]);
  const API_KEY = "6778126ab7a7fa0de2ee5953683a04ed";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch data based on endpoint
  useEffect(() => {
    axios
      .get(`${BASE_URL}/${endpoint}?api_key=${API_KEY}`)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error(`Error fetching ${title} data:`, error);
      });
  }, [endpoint]);

  return (
    <>
      <section className="movies py-4">
        <div className="container">
          <div className="title">
            <h2>
              {link != "" ? (
                <NavLink to={link}>
                  {title} <LiaAngleRightSolid className="angle-right" />
                </NavLink>
              ) : (
                `${title}`
              )}
            </h2>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="mt-4"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="movie">
                  <NavLink
                    key={item.id}
                    to={
                      item.media_type === "movie" // Check the media type
                        ? `/movie/${item.id}`
                        : `/tv/${item.id}`
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      className="poster img-fluid"
                    />
                    <div className="content">
                      <div className="movie-name">
                        {item.title || item.name}
                      </div>
                    </div>
                  </NavLink>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default TrendingSlider;
