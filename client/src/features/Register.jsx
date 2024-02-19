// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Button, TextField } from "@mui/material";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: ""
//   });

//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form data (e.g., check for required fields)
//     if (!formData.username || !formData.password) {
//       setError("Username and password are required.");
//       return;
//     }

//     // Submit form data to the server
//     try {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });
//       if (!response.ok) {
//         throw new Error("Failed to register user.");
//       }
//       // Handle success response (redirect user to login page)
//       window.location.href = "/login";
//     } catch (error) {
//       // Handle error response (display error message)
//       setError(error.message);
//     }
//   };

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
// }
