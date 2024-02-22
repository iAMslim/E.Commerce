import react from 'react'
import { useGetCartByIdQuery } from "../components/api/CartApi";

function Cart() {
  return (
      <div className="container"
          style={{
              backgroundColor: "lightblue",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}
      >
          Welcome to your Cart
      </div>
  );
}

export default Cart;