import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Home() {
  const nav = useNavigate();
  return (
    <>
      <div>
        <Button onClick={() => nav("/books")}>Shop all Books</Button>
      </div>
    </>
  );
}

export default Home;