import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useRegisterUserMutation } from "../components/api/AuthApi";
// import { setToken } from "../components/slices/AuthSlice";

export default function Register() {
  const [newUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const results = newUser(formData);
    console.log(results);
    console.log(formData)
    navigate("/auth/login");
  };

  return (
    <div className="loginPage">
      <form onSubmit={onSubmit} className="loginForm">
        <h1 className="Header">Register Account</h1>
        <div className="formDetails">
          <input
            type="text"
            placeholder="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-2">
          Sign Up
        </button>
        <p>
          Have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
