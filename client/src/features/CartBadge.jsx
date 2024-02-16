import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  
  function CartBadge() {
    const nav = useNavigate();
  
    return (
      <div>
        <IconButton aria-label="cart" onClick={() => nav("/cart")}>
          <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    );
  }
  
  export default CartBadge;