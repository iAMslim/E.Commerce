import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../components/slices/AuthSlice";
import { Navigate } from "react-router-dom";
// import CartBadge from "./CartBadge";

export default function NavBar() {
  const  token  = useSelector((state) => state.authSlice);
  const  users  = useSelector((state) => state.authSlice);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    nav("/");
  };



  return (
    <Box sx={{ flexGrow: 1 }} margin="0px 0px 20px">
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="h6"
            component="div"
            edge="start"
            onClick={() => nav("/api/books")}
          >
            Book Store
          </Button>
          <Button color="inherit" onClick={() => nav("/auth/me")}>
            My Account
          </Button>
          <Button color="inherit" onClick={() => nav("api/cart")}>
            Cart
          </Button>
          {!token ? (
            <>
              <Button color="inherit" onClick={() => nav("auth/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => nav("auth/register")}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => nav("/home")}>
                My Account
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
