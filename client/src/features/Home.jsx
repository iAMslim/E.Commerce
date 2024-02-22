import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../components/slices/AuthSlice";
import { useUpdateBookMutation } from "../components/api/BookApi";
import { useUserInfoQuery } from "../components/api/AuthApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { token, users } = useSelector((state) => state.AuthSlice);
  // const { users }  = useSelector((state) => state.UserSlice);
  const [returnBook] = useUpdateBookMutation();
  console.log("hello", users);

  // Retrieve token from localStorage
  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);
  console.log(getToken);

  const GetInfo = useUserInfoQuery(token);
  const navigate = useNavigate();

  useEffect(() => {
    //runs at page load, redirects if user is not logged in, cannot call navigate directly so have to use effect
    const redirect = () => {
      navigate("/auth/me/:id");
    };
    !token && redirect(); //same as if(!token) redirect();
  }, [navigate, token]);

  const logout = () => {
    dispatch(setToken(null));
    console.log({ token });
    navigate("/api/books");
  };

  const bookReturn = async (e) => {
    let parameters = {
      id: e.target.id,
      token: token,
      body: { available: true },
    };
    let info = await returnBook(parameters);
    console.log(`test`, info);
  };

  return (
    // <div className="container">
    //   <div
    //     style={{
    //       backgroundColor: "lightblue",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       minHeight: "100vh",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    users && (
      <div>
        <h1>Welcome, {users.username}!</h1>
        <h2>Account Info</h2>
        <p>
          Books Checked Out: {users.orders}
          <button id={Home.books} onClick={bookReturn}>
            Return
          </button>
        </p>
        <button onClick={logout}> Logout </button>
      </div>
    )
  );
};

export default Home;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../components/slices/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import { useUpdateBookMutation } from "../components/api/BookApi";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.AuthSlice);
//   const [returnBook] = useUpdateBookMutation();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       dispatch(setToken(storedToken));
//     } else {
//       navigate("/auth/login");
//     }
//   }, [dispatch, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch(setToken(null));
//     navigate("/auth/login");
//   };

//   const handleBookReturn = async (bookId) => {
//     try {
//       const parameters = {
//         id: bookId,
//         token: token,
//         body: { available: true },
//       };
//       const response = await returnBook(parameters);
//       console.log("Book return response:", response);
//     } catch (error) {
//       console.error("Error returning book:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {user ? (
//         <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//           <h1>Welcome to the Home Page, {user.username}!</h1>
//           <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
//             <h2 style={{ marginBottom: "10px" }}>Account Info</h2>
//             <p style={{ marginBottom: "5px" }}><strong>Username:</strong> {user.username}</p>
//             <p style={{ marginBottom: "5px" }}><strong>Email:</strong> {user.email}</p>
//           </div>
//           <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Logout</button>
//           {/* Assuming you have a list of books with their IDs */}
//           <button onClick={() => handleBookReturn(bookId)} style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#2196f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Return Book</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Home;
