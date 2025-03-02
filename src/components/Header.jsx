import React, { useEffect, useState } from "react";
import logo from "../assets/Cineo.svg";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`fixed-top d-flex align-items-center ${
          scrolling ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center gap-4">
            <div className="logo">
              <NavLink to="/">
                <img src={logo} alt="Cineo" />
              </NavLink>
            </div>
            <div className="search d-none d-lg-block">
              <SearchBar />
            </div>

            <nav className="d-none d-sm-block">
              <ul className="navbar">
                <li>
                  <NavLink to="tv-shows">TV Shows</NavLink>
                </li>
                <li>
                  <NavLink to="movies">Movies</NavLink>
                </li>
              </ul>
            </nav>
            <div className="ms-auto d-none d-sm-block">
              <NavLink to="#" className="account">
                Sign In
              </NavLink>
            </div>

            {isMobileMenuOpen ? (
              <RxCross1
                className="mobile-nav-toggle d-sm-none d-block"
                onClick={toggleMobileMenu}
              />
            ) : (
              <RxHamburgerMenu
                className="mobile-nav-toggle d-sm-none d-block"
                onClick={toggleMobileMenu}
              />
            )}
          </div>

          <div className="mobile-search d-lg-none d-block">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav">
            {/* <RxCross1 /> */}

            <NavLink to="/" onClick={toggleMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/movies" onClick={toggleMobileMenu}>
              Movies
            </NavLink>
            <NavLink to="/tv-shows" onClick={toggleMobileMenu}>
              TV Shows
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
