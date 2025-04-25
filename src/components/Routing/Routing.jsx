import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Navbar/Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import SignupPage from "../Authentication/SignupPage";
import LoginForm from "../Authentication/LoginForm";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="/products/:id" element={<SingleProduct />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/myorders" element={<MyOrderPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Route>
    </Routes>
  );
};

export default Routing;

{
  /* <HomePage /> */
}
{
  /* <ProductsPage></ProductsPage> */
}
{
  /* <SingleProduct></SingleProduct> */
}
{
  /* <CartPage></CartPage> */
}
{
  /* <MyOrderPage></MyOrderPage> */
}
{
  /* <LoginForm></LoginForm> */
}
//   <SignupPage></SignupPage>
