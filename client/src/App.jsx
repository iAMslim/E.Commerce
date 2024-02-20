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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
          <Route path={"api/login"} element={<Login />}></Route>
          <Route path={"api/users/register"} element={<Register />}></Route>
        </Routes>
     
    </div>
  );
};

export default App;

// const App = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api")
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//   return (
//     <>
//       <h1>Vite + React</h1>
//       <p>Books: {books.length}</p>

// {
//       books.map((book, index) => (
//         <div key={book.id}>
//           <h3>{book.title}</h3>
//           <p>{book.description}</p>
//           <p>{book.imgUrl}</p>
//           <p>{book.inStock}</p>
//         </div>
//       ))
//     }
//     </>
//   );
// };

// export default App;
