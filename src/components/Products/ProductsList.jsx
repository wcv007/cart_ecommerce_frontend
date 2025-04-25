import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [order, setOrder] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search");

  const handlePageChange = (page) => {
    const oldParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...oldParams, page: page });
  };
  const {
    data: productList = [],
    error,
    isLoading,
  } = useData(
    "/products",
    {
      params: { category, page, search: searchQuery },
    },
    [category, page, searchQuery]
  );
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const updatedList = productList ? [...productList.products] : [];
    if (order === "price desc") {
      updatedList.sort((a, b) => b.price - a.price);
    }
    if (order === "price asc") {
      updatedList.sort((a, b) => a.price - b.price);
    }
    if (order === "rate desc") {
      updatedList.sort((a, b) => b.reviews.rate - a.reviews.rate);
    }
    if (order === "rate asc") {
      updatedList.sort((a, b) => a.reviews.rate - b.reviews.rate);
    }
    setFilteredList(updatedList);
  }, [order, productList]);

  return (
    <section>
      <header className="products_header_wrapper">
        <h3>Products</h3>
        <select
          type="select"
          name="filter"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <main className="products_list">
        {isLoading
          ? skeleton.map((index) => (
              <ProductCardSkeleton
                key={index}
                width="176px"
                className="productcard_wrapper"
              />
            ))
          : productList &&
            filteredList?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        {error && <em className="form_error">{error}</em>}
      </main>
      <Pagination
        handlePageChange={handlePageChange}
        totalResults={(productList && productList.totalProducts) || 0}
        perPageResults={(productList && productList.postPerPage) || 1}
        currentPage={page || 1}
      ></Pagination>
      {/* <button onClick={() => handlePageChange(2)}>Pagination</button> */}
    </section>
  );
};

export default ProductsList;
