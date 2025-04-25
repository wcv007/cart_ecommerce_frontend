import React, { useState, useContext } from "react";
import "./QuantityInput.css";
import CartContext from "../../contexts/CartContext";

const QuantityInput = ({ stock, quantity, setQuantity, id }) => {
  // const [counter, setCounter] = useState(amount);
  const cartObj = useContext(CartContext);
  const { updateCart } = cartObj;
  return (
    <>
      <button
        disabled={quantity <= 0}
        className="stock_button"
        type="button"
        onClick={() => {
          if (setQuantity) {
            setQuantity((prev) => prev - 1);
          } else {
            updateCart(id, quantity - 1, false);
          }
        }}
      >
        -
      </button>
      <span className="stock">{quantity}</span>
      <button
        className="stock_button"
        type="button"
        onClick={() => {
          if (setQuantity) {
            setQuantity((prev) => prev + 1);
          } else {
            updateCart(id, quantity + 1, true);
          }
        }}
        disabled={quantity >= stock}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
