import React, { useState } from "react";
import { useLoginUserMutation } from "../components/api/AuthApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [data] = useLoginUserMutation();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const login = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let info = await data(formData);
    console.log(info.formData);
    console.log(data)
    console.log(info)

    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>

        <input type="text" id="username" name="username" onChange={login} />
      </div>

      <div>
        <label htmlFor="password">Password:</label>

        <input type="password" id="password" name="password" onChange={login} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}