import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Home() {
  const { users, token } = useSelector((state) => state.authSlice);
  // console.log(users, token);
  // console.log(users);

  return (
    <div>
      <Navigation></Navigation>
      {users && (
        <div className="user-detail">
          <h2>Account Details </h2>
          <hr/>
          <h4>Id: {users.id}</h4>
          <h4>First Name: {users.firstname}</h4>
          <h4>Last Name: {users.lastname}</h4>
          <h4>Email: {users.email}</h4>
          <h4>Password: {users.password}</h4>
        </div>
      )}
    </div>
  );
}
