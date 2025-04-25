import React, { useState, useEffect } from "react";
import apiClient from "../../utils/api-client";

const useData = (url, urlParams, deps) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // console.log(urlParams, "urlParams");
  // console.log(deps, "deps");
  // console.log(error, "error");
  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(url, urlParams)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );
  return { data, error, isLoading };
};

export default useData;

// Sample - http://localhost:5000/api/category
// 1. [GET] Getting all products - http://localhost:5000/api/products
// for display product image, path should be
// http://localhost:5000/products/iphone14pro-1.jpg
// 2. [GET] Getting Categories - http://localhost:5000/api/category
// For display category image, path should be
// http://localhost:5000/category/mobile.png
// 3. [GET] Getting Products by category - http://localhost:5000/api/products?
// category=Laptops
// 4. [GET] Getting Products by pagination - http://localhost:5000/api/products?
// category=Laptops&page=2
// 5. [GET] Single Product details -
// http://localhost:5000/api/products/6430dfda0b72166a9f2dd5be
// for display product image, path should be
// http://localhost:5000/products/iphone14pro-1.jpg
// 6. [POST] Register New User - http://localhost:5000/api/user/signup
// 7. [POST] Login User - http://localhost:5000/api/user/login
// 8. [POST] Add to Cart API -
// http://localhost:5000/api/cart/6430dfda0b72166a9f2dd5be
// last one is the product id, which you want to add in the cart and also you
// have to pass quantity of the product in the body of this API
// 9. [GET] Get User Cart API - http://localhost:5000/api/cart
// 10. [PATCH] Remove Item from Cart API -
// http://localhost:5000/api/cart/remove/6430dfda0b72166a9f2dd5be
// 11. [PATCH] Increase Product quantity for Cart API -
// http://localhost:5000/api/cart/increase/6430dfda0b72166a9f2dd5be
// 12. [PATCH] Decrease Product quantity for Cart API -
// http://localhost:5000/api/cart/decrease/6430dfda0b72166a9f2dd5be
// 13. [POST] Checkout/Confirm Order API - http://localhost:5000/api/order/checkout
// 14. [GET] User Ordered Details API - http://localhost:5000/api/order/
// 15. [GET] Getting Featured Products API -
// http://localhost:5000/api/products/featured
// 16. [GET] Getting Suggestion for Search Products API -
// http://localhost:5000/api/products/suggestions?search=iphone
