import React from "react";
import { useUserInfoQuery } from "../components/api/AuthApi";
import { useGetUserByIdQuery } from "../components/api/UserApi";

function Home() {
  const { data: users } = useGetUserByIdQuery();

  return (
    <div>
      {users && (
        <div className="user-detail">
          <h2>Account Details </h2>
          <hr />
          <h4>Id: {users.id}</h4>
          <h4>First Name: {users.username}</h4>
        </div>
      )}
    </div>
  );
}

export default Home;
