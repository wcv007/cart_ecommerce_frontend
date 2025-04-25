import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
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

setAuthToken(localStorage.getItem("token"));
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
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
        res.data ? setCart(res.data) : null;
      })
      .catch((err) => console.log("error", err?.message));
  };
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const matchId = updatedCart.findIndex(
      (element) => element.product._id === product._id
    );
    if (matchId !== -1) {
      updatedCart[matchId].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }
    cartServices(product._id, quantity)
      .then((res) => {
        console.log(res?.data?.message);
        setCart(updatedCart);
        toast.success("Product added successfully");
      })
      .catch((err) => {
        console.log(err?.message);
        setCart(cart);
        toast.error("Product added unsuccessful");
      });
  };

  const removeCart = (id) => {
    const oldCart = [...cart];
    removeCartAPI(id)
      .then((res) => {
        console.log("removal successful", res);
        const updatedCart = oldCart.filter(
          (element) => element.product._id !== id
        );
        setCart(updatedCart);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product removal unsuccessful");
      });
  };

  const updateCart = (id, quantity, increase) => {
    const updatedCart = [...cart];
    const matchId = cart.findIndex((element) => element.product._id === id);
    if (matchId !== -1) {
      updatedCart[matchId].quantity = quantity;
      setCart(updatedCart);

      increase
        ? increaseCartAPI(id).catch((err) => setCart(cart))
        : decreaseCartAPI(id).catch((err) => setCart(cart));
    } else {
      setCart(cart);
    }
  };
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeCart, updateCart, setCart }}
      >
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
