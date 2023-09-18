import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { FaShoppingBag } from 'react-icons/fa';
import './css/FirstPage.css';

const FirstPage = () => {
  return (
    <div className="first-page">
      <header>
        <div className="header-content">
          <div className="logo">
            <FaShoppingBag />
          </div>
          <div className="header-info">
            <h1 className="store-title">E-shop</h1>
            <p className="cool-comment">Your just in time!</p>
          </div>
          <div className="login-button">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </header>
      <div className="carousel-container">
        <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/picture1.jpeg'} alt="Product 1" className="carousel-image" />
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/picture2.jpg'} alt="Product 2" className="carousel-image" />
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/picture3.jpg'} alt="Product 3" className="carousel-image" />
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/download.jpg'} alt="Product 3" className="carousel-image" />
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/download1.jpg'} alt="Product 3" className="carousel-image" />
          </div>
          {/* Add more carousel items as needed */}
        </Carousel>
      </div>
    </div>
  );
};

export default FirstPage;
