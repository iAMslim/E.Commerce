import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
// more mui imports to view changes on navbar, uncomment added code below
// import { makeStyles, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../components/slices/AuthSlice";
// not sure if this navigate is used for anything
// import { Navigate } from "react-router-dom";
// charles had the line below commented out, think we deleted this
// import CartBadge from "./CartBadge";
// uncomment to change lines 17-32
// const useStyles = makeStyles((theme) => ({
//   navbar: {
//     background: `url('https://www.transparenttextures.com/patterns/axiom-pattern.png')`,
//     display: "flex",
//     justifyContent: "center",
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//     },
//   },
//   button: {
//     margin: theme.spacing(1),
//     [theme.breakpoints.down("sm")]: {
//       margin: theme.spacing(1, 0),
//     },
//   },
// }));
export default function NavBar() {
  const  token  = useSelector((state) => state.authSlice);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const  users  = useSelector((state) => state.authSlice);
  // uncomment to change style lines 41-43
  // const classes = useStyles();
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
          <Button color="inherit" onClick={() => nav("/auth/me/:id")}>
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
// to use the new style uncomment everything below and comment out the lines 50-92 above
// return (
//   <Box sx={{ flexGrow: 1 }}>
//     <AppBar position="static">
//       <Toolbar className={classes.navbar}>
//         <Button
//           variant="h6"
//           component="div"
//           edge="start"
//           className={classes.button}
//           onClick={() => nav("/api/books")}
//         >
//           Book Store
//         </Button>
//         {!isSmallScreen && (
//           <>
//             <Button
//               color="inherit"
//               className={classes.button}
//               onClick={() => nav("/auth/me")}
//             >
//               My Account
//             </Button>
//             <Button
//               color="inherit"
//               className={classes.button}
//               onClick={() => nav("api/cart")}
//             >
//               Cart
//             </Button>
//           </>
//         )}
//         {!token ? (
//           <>
//             <Button
//               color="inherit"
//               className={classes.button}
//               onClick={() => nav("auth/login")}
//             >
//               Login
//             </Button>
//             <Button
//               color="inherit"
//               className={classes.button}
//               onClick={() => nav("auth/register")}
//             >
//               Register
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button
//               color="inherit"
//               className={classes.button}
//               onClick={() => nav("/home")}
//             >
//               My Account
//             </Button>
//             <Button color="inherit" className={classes.button} onClick={logout}>
//               Logout
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   </Box>
// );
// }