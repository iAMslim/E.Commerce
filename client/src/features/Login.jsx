import React, { useState } from "react";
import { useLoginUserMutation } from "../components/api/AuthApi";
import { useNavigate } from "react-router-dom";
// think we need the imports below.
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

export default function LoginForm() {
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [userId, setUserId] = useState(null);

  // const login = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      console.log("Login response:", data);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // let info = await data(formData);
  // console.log(info);
  // console.log(formData);

 

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>

        <input
         type="text"
          id="username" 
          name="username" 
          onChange={handleChange}
           />
      </div>

      <div>
        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
