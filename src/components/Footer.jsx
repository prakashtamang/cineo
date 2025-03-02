import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-10">
              <ul className="d-flex flex-wrap column-gap-4 row-gap-2">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Top Shows</a>
                </li>
                <li>
                  <a href="#">Top Movies</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Download App</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
              <ul className="d-flex gap-4 mt-2 tac">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-lg-0 mt-3">
              <div className="social-icons d-flex gap-3 align-items-center">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p className="mb-0">
            &copy; Copyright {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="credits">
            Developed by{" "}
            <a href="https://prakashtamang.com/" target="_blank">
              Prakash Tamang
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
