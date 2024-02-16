import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import CartBadge from "./CartBadge";

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
            onClick={() => nav("/")}
          >
            Grocery Store
          </Button>
          <Button color="inherit" onClick={() => nav("/books")}>
            Books
          </Button>
          <Button color="inherit" onClick={() => nav("/cart")}>
            Cart
          </Button>
          <Button color="inherit" onClick={() => nav("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => nav("/users")}>
            My Account
          </Button>
          <Button color="inherit" onClick={() => nav("/auth")}>
            Admin
          </Button>
          <CartBadge />
        </Toolbar>
      </AppBar>
    </Box>
  );
}