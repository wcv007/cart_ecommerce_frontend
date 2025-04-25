import React, { useEffect } from "react";
import "./FeaturedProducts.css";
import ProductCard from "../../Products/ProductCard";
import useData from "../../hooks/useData";
import Loader from "../../Common/Loader";
import ProductCardSkeleton from "../../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useData("/products/featured");
  const skeleton = [1, 2, 3];
  return (
    <section className="featuredproducts align_center">
      <div className="heading_wrapper">
        <h2 className="heading">FeaturedProducts</h2>
      </div>
      <div className="product_wrapper">
        {isLoading
          ? skeleton.map((index) => (
              <ProductCardSkeleton
                key={index}
                width="176px"
                className="productcard_wrapper"
              />
            ))
          : featuredProducts &&
            featuredProducts?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        {error && <em className="form_error">{error}</em>}
      </div>
    </section>
  );
};

export default FeaturedProducts;
