import React, { useMemo, useState } from "react";
import {
  useGetMyCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from "../redux/api/CartApi";
import { useCheckoutMutation } from "../redux/api/OrderApi";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetMyCartQuery();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const cartItems = data?.BookInCart || [];

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.book.price;
    }, 0);
  }, [cartItems]);

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  const primaryButtonStyle = {
    padding: "12px 20px",
    fontSize: "16px",
    marginTop: "1rem",
    cursor: "pointer",
  };

  const secondaryButtonStyle = {
    padding: "10px 20px",
    marginTop: "1rem",
    cursor: "pointer",
  };

  const quantityButtonStyle = {
    width: "32px",
    height: "32px",
    cursor: "pointer",
  };

  const handleRemove = async (bookInCartId) => {
    try {
      await removeCartItem(bookInCartId).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleQuantityChange = async (bookInCartId, newQuantity) => {
    if (newQuantity < 1 || isCheckingOut) return;

    try {
      await updateCartItemQuantity({
        bookInCartId,
        quantity: newQuantity,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleCheckout = async () => {
    setCheckoutError("");

    try {
      await checkout().unwrap();
      setCheckoutSuccess(true);
    } catch (err) {
      console.error("Checkout failed:", err);
      setCheckoutError("Checkout failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem" }}>Something went wrong loading your cart.</div>;
  }

  if (checkoutSuccess) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Order Placed Successfully</h1>
        <p>Your order has been created.</p>

        <button
          onClick={() => navigate("/books")}
          style={secondaryButtonStyle}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven’t added anything yet.</p>

        <button
          onClick={() => navigate("/books")}
          style={secondaryButtonStyle}
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => {
        const subtotal = item.quantity * item.book.price;

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "1rem",
              border: "1px solid #000000",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <img
              src={item.book.imgUrl}
              alt={item.book.title}
              style={{ width: "80px", height: "120px", objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.book.title}</h3>
              <p>{formatCurrency(item.book.price)}</p>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || isCheckingOut}
                  style={quantityButtonStyle}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  disabled={isCheckingOut}
                  style={quantityButtonStyle}
                >
                  +
                </button>
              </div>

              <p>Subtotal: {formatCurrency(subtotal)}</p>

              <button
                onClick={() => handleRemove(item.id)}
                disabled={isCheckingOut}
                style={{ cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <div
        style={{
          borderTop: "2px solid #000000",
          paddingTop: "1rem",
          marginTop: "2rem",
        }}
      >
        <h2>Total: {formatCurrency(total)}</h2>

        {checkoutError && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{checkoutError}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          style={primaryButtonStyle}
        >
          {isCheckingOut ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}

export default Cart;