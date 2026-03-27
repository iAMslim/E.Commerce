import React from "react";
import { Route, Routes } from "react-router";
import Books from "./features/Books";
import SingleBook from "./features/SingleBook";
import Cart from "./features/Cart";
import Home from "./features/Home";
import Login from "./features/Login";
import NavBar from "./features/NavBar";
import Register from "./features/Register";
import Orders from "./features/Orders";
import OrderDetails from "./features/OrderDetails";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"*"} element={<Home />}></Route>
        <Route path={"/books"} element={<Books />}></Route>
        <Route path={"/books/:id"} element={<SingleBook />}></Route>
        <Route path={"/cart"} element={<Cart />}></Route>
        <Route path={"auth/me"} element={<Home />}></Route>
        <Route path={"/auth/login"} element={<Login />}></Route>
        <Route path={"auth/register"} element={<Register />}></Route>
        <Route path={"/orders"} element={<Orders />} />
        <Route path={"/orders/:id"} element={<OrderDetails />}></Route>
      </Routes>
    </div>
  );
};

export default App;
