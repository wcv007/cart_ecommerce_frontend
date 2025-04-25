import React, { useEffect, useReducer, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./app.css";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  cartServices,
  getCartAPI,
  removeCartAPI,
  increaseCartAPI,
  decreaseCartAPI,
} from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import { getUser } from "./services/userServices";
import cartReducer from "./reducers/CartReducer";

setAuthToken(localStorage.getItem("token"));
const App = () => {
  const [user, setUser] = useState(null);
  //const [cart, setCart] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      // console.log(jwtUser);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (err) {}
  }, []);
  useEffect(() => {
    getCart();
  }, [user]);

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        console.log(res?.data);
        res.data
          ? dispatchCart({ type: "GET_CART", payload: { data: res.data } })
          : null;
      })
      .catch((err) => console.log("error", err?.message));
  };
  const addToCart = (product, quantity) => {
    dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
    cartServices(product._id, quantity)
      .then((res) => {
        console.log(res?.data?.message);
        toast.success("Product added successfully");
      })
      .catch((err) => {
        console.log(err?.message);
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
        toast.error("Product added unsuccessful");
      });
  };

  const removeCart = (id) => {
    const oldCart = [...cart];
    removeCartAPI(id)
      .then((res) => {
        console.log("removal successful", res);
        // const updatedCart = oldCart.filter(
        //   (element) => element.product._id !== id
        // );
        // setCart(updatedCart);
        dispatchCart({ type: "REMOVE_CART", payload: { id } });
      })
      .catch((err) => {
        console.log(err);
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
        toast.error("Product removal unsuccessful");
      });
  };

  const updateCart = (id, quantity, increase) => {
    const updatedCart = [...cart];
    const matchId = cart.findIndex((element) => element.product._id === id);
    if (matchId !== -1) {
      updatedCart[matchId].quantity = quantity;
      // setCart(updatedCart);
      dispatchCart({ type: "UPDATE_CART", payload: { id, quantity } });

      increase
        ? increaseCartAPI(id).catch((err) =>
            dispatchCart({ type: "REVERT_CART", payload: { cart } })
          )
        : decreaseCartAPI(id).catch((err) =>
            dispatchCart({ type: "REVERT_CART", payload: { cart } })
          );
    } else {
      // setCart(cart);
      dispatchCart({ type: "REVERT_CART", payload: { cart } });
    }
  };
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{ cart, addToCart, removeCart, updateCart }}>
        <div className="app">
          <Navbar cartLength={cart.length}></Navbar>
          <ToastContainer position="bottom-center"></ToastContainer>
          <Routing></Routing>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
