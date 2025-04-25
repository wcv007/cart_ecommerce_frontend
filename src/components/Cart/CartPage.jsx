import React, { useEffect, useState, useContext, useMemo } from "react";
import User from "../../assets/user.webp";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import Remove from "../../assets/remove.png";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutCartAPI } from "../../services/cartServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const userObj = useContext(UserContext);
  const cartObj = useContext(CartContext);
  const { cart, removeCart, updateCart, setCart } = cartObj;
  console.log(cartObj);
  const countCost = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].product.price * cart[i].quantity;
    }
    setCartTotal(total);
  };
  useEffect(() => {
    countCost(cart);
  }, [cart]);

  // const countCost = (cart) => {
  //   let total = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     total = total + cart[i].product.price * cart[i].quantity;
  //   }
  //   return total;
  // };

  // const cartTotal = useMemo(() => {
  //   return countCost(cart);
  // }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutCartAPI()
      .then(() => {
        toast.success("Checkout successful");
      })
      .catch((err) => {
        toast.error(err.message);
        setCart(oldCart);
      });
  };

  return (
    <section className="cart_page">
      <div className="userinfo_wrapper align_center">
        <div className="user_image_wrapper">
          <img
            className="user_image"
            src={`http://localhost:8000/profile/${userObj?.profilePic}`}
            alt="user img"
          ></img>
        </div>
        <div className="user">
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>
      <div className="cart_modify">
        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
          <tbody>
            {cart.map((data, index) => (
              <tr key={index}>
                <td>{data?.product.title}</td>
                <td>{data?.product.price}</td>
                <td>
                  <QuantityInput
                    quantity={data?.quantity}
                    id={data?.product._id}
                  />
                </td>
                <td>{data?.quantity * data?.product.price}</td>
                <td>
                  <img
                    src={Remove}
                    alt="remove"
                    className="remove_img"
                    onClick={() => removeCart(data?.product._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="cart_bill align_center">
        <table className="cart_table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>{cartTotal}</td>
            </tr>
            <tr>
              <td>Shipping Charges</td>
              <td>5$</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{cartTotal + 5}</td>
            </tr>
          </tbody>
        </table>
        <button className="checkout" onClick={() => checkout()}>
          Checkout
        </button>
      </div>
    </section>
  );
};

export default CartPage;
