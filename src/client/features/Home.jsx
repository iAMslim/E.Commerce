import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../redux/api/AuthApi";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.AuthSlice);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !token) {
      dispatch(setToken(storedToken));
      return;
    }

    if (!storedToken && !token) {
      navigate("/auth/login");
    }
  }, [dispatch, navigate, token]);

  const {
    data: user,
    error,
    isLoading,
  } = useUserInfoQuery(token, {
    skip: !token,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    navigate("/auth/login");
  };

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ padding: "20px" }}>Error loading user data.</p>;
  }

  if (!user) {
    return <p style={{ padding: "20px" }}>No user data found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>My Account</h1>

        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Account Info</h2>

          <p style={{ marginBottom: "8px" }}>
            <strong>Username:</strong> {user.username}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
