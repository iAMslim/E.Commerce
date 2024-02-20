import React, { useState } from "react";
import { useLoginMutation } from "../components/api/UserApi";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [data] = useLoginMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
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

export default LoginForm;
