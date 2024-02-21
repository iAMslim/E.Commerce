import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Books from "./features/Books";
import SingleBook from "./features/SingleBook";
import Cart from "./features/Cart";
import Home from "../src/features/Home";
import Login from "../src/features/Login";
import NavBar from "./features/NavBar";
import Register from "../src/features/Register";
import { useGetAllBooksQuery } from "./components/api/BookApi";

const App = () => {
  const [books, setBooks] = useState([]);


  return (
    <div>
      <h1>Library App</h1>
      
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"*"} element={<Home />}></Route>
          <Route path={"api/books"} element={<Books />}></Route>
          <Route path={"api/books/:id"} element={<SingleBook />}></Route>
          <Route path={"api/cart"} element={<Cart />}></Route>
          <Route path={"/home"} element={<Home />}></Route>
          <Route path={"auth/login"} element={<Login />}></Route>
          <Route path={"auth/register"} element={<Register />}></Route>
        </Routes>
     
    </div>
  );
};

export default App;

