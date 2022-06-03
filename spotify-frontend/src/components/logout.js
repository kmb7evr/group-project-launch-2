import { useContext } from 'react';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import Navbar from "./navbar";
import { Link, Outlet } from "react-router-dom";


function Logout() {
  const { setAccessToken } = useContext(AccessTokenContext);
  setAccessToken("")

  return (
    <div className="App">
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        You have successfully logged out. To log back in, <Link to="/" > click here</Link>
    </div>
  );
}

export default Logout;