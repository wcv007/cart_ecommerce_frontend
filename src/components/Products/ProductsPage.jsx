import React from "react";
import "./ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  return (
    <div className="products_page">
      <ProductsSidebar></ProductsSidebar>
      <ProductsList></ProductsList>
    </div>
  );
};

export default ProductsPage;
