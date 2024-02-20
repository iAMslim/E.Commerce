import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { Button, TextField } from "@mui/material";
import { useCreateUserMutation } from "../components/api/UserApi";
import { useDispatch } from "react-redux";
import { setToken } from "../components/slices/AuthSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const { username, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit form data to the server
    //   try {
    //     const response = await createUser(formData);
    //     dispatch(registerSuccess(response.data));
    //     navigate("/login"); // Redirect to login page after successful registration
    //   } catch (error) {
    //     console.error("error registering");
    //   }
    // };
    try {
      const response = await createUser(formData);

      const { token, user } = response;

      dispatch(setToken({ token, user, isAdmin: formData.role === "admin" }));
      navigate("/login");
      setFormData({
        username: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isError && <p>Error: {isError.message}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
//   return (
//     <div>
//       <h1>Sign Up</h1>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <TextField
//             type="text"
//             label="Username"
//             variant="outlined"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </div>
//         <div>
//           <TextField
//             type="password"
//             label="Password"
//             variant="outlined"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </div>

//         <Button variant="contained" type="submit">
//           Sign Up
//         </Button>
//       </form>
//       <p>
//         Have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

export default Register;
