import React from "react";
import "./HeroSection.css";

const HeroSection = ({ title, subTitle, link, image }) => {
  return (
    <section className="herosection">
      <div className="hero_text_wrapper">
        <h2 className="hero_heading">{title}</h2>
        <p>{subTitle}</p>
        <a className="buynow" href={link}>
          Buy Now
        </a>
      </div>
      <div className="image_wrapper">
        <img className="hero_img" src={image} alt="iphone image"></img>
      </div>
    </section>
  );
};

export default HeroSection;
