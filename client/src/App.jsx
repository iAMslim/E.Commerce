// import "./App.css";
import { Route, Routes } from "react-router";
import Books from "../src/features/Books";
import SingleBook from "./features/SingleBook";
import Cart from "../src/features/Cart";
import Home from "../src/features/Home";
import Login from "../src/features/Login";
import NavBar from "../src/features/NavBar";
import Register from "../src/features/Register";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"*"} element={<Home />}></Route>
          <Route path={"/books"} element={<Books />}></Route>
          <Route path={"/books/:id"} element={<SingleBook />}></Route>
          <Route path={"/Cart"} element={<Cart />}></Route>
          <Route path={"/Home"} element={<Home />}></Route>
          <Route path={"/Login"} element={<Login />}></Route>
          <Route path={"/Register"} element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
