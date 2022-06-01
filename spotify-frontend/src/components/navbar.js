import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Navbar(props) {

  const [accessToken, setAccessToken] = useState();

  console.log(props.accessToken);


  return (
    <div className="App">
      <Link to="/">Home</Link> |{" "}
      <Link to="/Forum">Forum</Link> |{" "}
      <Link to="/LikedSongs">Liked Songs</Link> |{" "}
      <Link to="/TopSongs" state={{ accessToken: props.accessToken }}>Top Songs</Link> |{" "}
      <Link to="/TopArtists">Top Artists</Link> |{" "}
      <Link to="/Inbox">Inbox</Link> |{" "}
      <Link to="/UserProfile">User Profile</Link> |{" "}
    </div>
  );
}

export default Navbar;