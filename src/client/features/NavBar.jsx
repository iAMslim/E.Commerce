import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/slices/AuthSlice";
import CartBadge from "./CartBadge";

export default function NavBar() {
  const token = useSelector((state) => state.AuthSlice.token);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    nav("/");
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1f1f1f",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "72px",
            py: { xs: 1.5, md: 0 },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              color="inherit"
              onClick={() => nav("/books")}
              sx={{
                textTransform: "none",
                padding: 0,
                minWidth: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.3px",
                }}
              >
                Book Store
              </Typography>
            </Button>
          </Box>

          {/* CENTER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
              width: { xs: "100%", md: "auto" },
              mt: { xs: 1, md: 0 },
            }}
          >
            <Button
              color="inherit"
              onClick={() => nav("/orders")}
              sx={{ textTransform: "none", whiteSpace: "nowrap" }}
            >
              Orders
            </Button>

            <Button
              color="inherit"
              onClick={() => nav("/auth/me")}
              sx={{ textTransform: "none", whiteSpace: "nowrap" }}
            >
              My Account
            </Button>
          </Box>

          {/* RIGHT */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
              width: { xs: "100%", md: "auto" },
              mt: { xs: 1, md: 0 },
              borderTop: { xs: "1px solid rgba(255,255,255,0.1)", md: "none" },
              pt: { xs: 1, md: 0 },
            }}
          >
            <CartBadge />

            {!token ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => nav("/auth/login")}
                  sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => nav("/auth/register")}
                  sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={logout}
                sx={{ textTransform: "none", whiteSpace: "nowrap" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
