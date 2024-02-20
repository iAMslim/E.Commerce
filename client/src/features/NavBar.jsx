import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
// import CartBadge from "./CartBadge";

export default function NavBar() {
  //   const { token } = useSelector((state) => state.authSlice);

  const nav = useNavigate();

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
          <Button color="inherit" onClick={() => nav('api/books/')}>
            Book
          </Button>
          <Button color="inherit" onClick={() => nav("api/cart")}>
            Cart
          </Button>
          <Button color="inherit" onClick={() => nav("api/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => nav("/home")}>
            My Account
          </Button>
          <Button color="inherit" onClick={() => nav("api/users/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
