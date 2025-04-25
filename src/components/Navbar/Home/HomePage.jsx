import React from "react";
import HeroSection from "./HeroSection";
import Iphone from "../../../assets/iphone-14-pro.webp";
import Mac from "../../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Iphone 14 pro"
        subTitle="Experience the power of Iphone 14 with our most Pro camera ever"
        link="/"
        image={Iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subTitle="You can add Studio Display and color matched Magic accessories to your bag after configuring your Mac"
        link="/"
        image={Mac}
      />
    </div>
  );
};

export default HomePage;
