import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import "./SingleProduct.css";
import QuantityInput from "./QuantityInput";
import useData from "../hooks/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import backendURL from "../../utils/config";

// const product = {
//   id: 1,
//   title: "Product Title",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
//   price: 9.99,
//   images: [
//     "https://placehold.co/200x300?text=Product+Image+1",
//     "https://placehold.co/200x300?text=Product+Image+2",
//     "https://placehold.co/200x300?text=Product+Image+3",
//     "https://placehold.co/200x300?text=Product+Image+4",
//   ],
//   stock: 10,
// };
// const { id, title, description, price, images, stock } = product;
const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const cartObj = useContext(CartContext);
  const { addToCart, updateCart } = cartObj;
  const userObj = useContext(UserContext);
  const productId = useParams()?.id;
  const {
    data: singleProduct,
    error,
    isLoading,
  } = useData(`/products/${productId}`, {}, [productId]);
  const {
    images = [],
    title,
    stock,
    description,
    reviews,
    price,
    _id,
  } = singleProduct;
  return (
    <section className="single_product_wrapper align_center">
      {singleProduct && !isLoading && (
        <>
          <div className="product_images">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={`${backendURL}/products/${image}`}
                  className={
                    index === selectedImage
                      ? "single_image selected"
                      : "single_image"
                  }
                  alt="img"
                  onClick={() => setSelectedImage(index)}
                ></img>
              ))}
          </div>
          <div>
            <img
              className="selected_product"
              src={`${backendURL}/products/${images[selectedImage]}`}
              alt="images"
            ></img>
          </div>
          <div className="selected_product_details">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <p className="price">${price?.toFixed(2)}</p>
            {userObj && (
              <>
                <p className="quantity">Quantity: </p>
                <div className="stock_wrapper">
                  {/* <button disabled className="stock_button" type="button">
            -
          </button>
          <span className="stock">{stock}</span>
          <button className="stock_button" type="button">
            +
          </button> */}
                  <QuantityInput
                    stock={stock}
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>
                <button
                  className="cart"
                  onClick={() => {
                    addToCart(singleProduct, quantity);
                  }}
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </>
      )}
      {error && <em>{error.message}</em>}
      {isLoading && <Loader></Loader>}
    </section>
  );
};

export default SingleProduct;
