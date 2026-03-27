import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/api/OrderApi";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(id);

  if (isLoading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem" }}>Error loading order</div>;
  if (!order) return <div style={{ padding: "2rem" }}>Order not found</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/orders")}
        style={{
          marginBottom: "1rem",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        Back to Orders
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1.5rem",
        }}
      >
        <h1>Order #{order.id}</h1>
        <p>Status: {order.status}</p>
        <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>

        <div
          style={{
            borderTop: "1px solid #ccc",
            marginTop: "1rem",
            paddingTop: "1rem",
          }}
        >
          <h2>Items</h2>

          {order.orderItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "center",
              }}
            >
              <img
                src={item.book.imgUrl}
                alt={item.book.title}
                style={{
                  width: "70px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />

              <div>
                <p>{item.book.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>
                  Subtotal: ${(item.quantity * item.book.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;