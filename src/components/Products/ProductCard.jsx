import "./ProductCard.css";
import Basket from "../../assets/basket.png";
import WhiteStar from "../../assets/white-star.png";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
const ProductCard = ({ product = {} }) => {
  const {
    images = [],
    price,
    reviews: { counts, rate } = {},
    title,
    _id,
    stock,
  } = product;
  const { addToCart } = useContext(CartContext);
  const userObj = useContext(UserContext);
  return (
    <article className="align_center productcard_wrapper">
      <div className="product_image">
        <NavLink className="product_image_wrapper" to={`/products/${_id}`}>
          <img
            className="product_image"
            src={`http://localhost:8000/products/${images[0]}`}
            alt="iphone img"
          ></img>
        </NavLink>
      </div>
      <div className="product_details">
        <h4 className="product_price">${price}</h4>
        <p className="product_name">{title}</p>
        <div className="product_review align_center">
          <span className="product_rating">
            <img className="whitestar" src={WhiteStar} alt="whitestar"></img>
            {rate}
          </span>

          <div className="product_total_ratings">{counts}</div>
          {stock > 0 && userObj && (
            <img
              className="basket"
              src={Basket}
              alt="basket"
              onClick={() => addToCart(product, 1)}
            ></img>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
