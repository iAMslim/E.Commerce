import React from "react";
import { useGetMyOrdersQuery } from "../redux/api/OrderApi";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

function Orders() {
  const { data, isLoading, error } = useGetMyOrdersQuery();
  const navigate = useNavigate();

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  if (isLoading) {
    return <div className="orders-state">Loading...</div>;
  }

  if (error) {
    return <div className="orders-state">Error loading orders</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="orders-empty">
        <h1>No Orders Yet</h1>
        <p>You haven’t placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">Your Orders</h1>

        <div className="orders-list">
          {data.map((order) => (
            <div
              key={order.id}
              className="order-card"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div className="order-card-header">
                <div>
                  <h2 className="order-number">Order #{order.id}</h2>
                  <p className="order-date">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="order-summary">
                  <p>
                    Status: <strong>{order.status}</strong>
                  </p>
                  <p>
                    Total: <strong>{formatCurrency(order.totalPrice)}</strong>
                  </p>
                </div>
              </div>

              <div className="order-items">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={item.book.imgUrl}
                      alt={item.book.title}
                      className="order-item-image"
                    />

                    <div className="order-item-details">
                      <p className="order-item-title">{item.book.title}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>
                        Subtotal:{" "}
                        {formatCurrency(item.quantity * item.book.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;