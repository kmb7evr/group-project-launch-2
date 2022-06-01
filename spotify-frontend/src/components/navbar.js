import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {

  const [accessToken, setAccessToken] = useState();

  console.log(props.accessToken);
  const [userData, setUserData] = useState();

  useEffect(()=>{
    fetch("http://localhost:9000/users/data")
  .then((res) => {return (res.json());})
  .then((text) => {setUserData(text.result)})
  .catch((err) => console.log(err))
  },[]);

  let user = null;
  if (userData) {
    for(let i = 0; i<userData.length; i++) {
       if (userData[i].username == 'katie') {
           user = userData[i]
       }
    }
  }


  return (
    <div className="App">
      <Link to="/">Home</Link> |{" "}
      <Link to="/Forum">Forum</Link> |{" "}
      <Link to="/LikedSongs">Liked Songs</Link> |{" "}
      <Link to="/TopSongs" state={{ accessToken: props.accessToken }}>Top Songs</Link> |{" "}
      <Link to="/TopArtists">Top Artists</Link> |{" "}
      <Link to="/Inbox">Inbox</Link> |{" "}
      <Link to="/UserProfile" state= {{currUser: user}} >User Profile</Link> |{" "}

    </div>
  );
}

export default Navbar;