import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {
  const [accessToken, setAccessToken] = useState();

  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/users/data")
      .then((res) => { return (res.json()); })
      .then((text) => { setUserData(text.result) })
      .catch((err) => console.log(err))
  }, []);


  return (
    <div className="App">
      <Link to="/" state={{ accessToken: props.accessToken }}>Home</Link> |{" "}
      <Link to="/Forum" state={{ accessToken: props.accessToken }}>Forum</Link> |{" "}
      <Link to="/LikedSongs" state={{ accessToken: props.accessToken, songs: props.likedSongs }}>Liked Songs</Link> |{" "}
      <Link to="/TopSongs" state={{ accessToken: props.accessToken, songs: props.topSongs, yearSongs: props.topSongsY, monthSongs: props.topSongsM }}>Top Songs</Link> |{" "}
      <Link to="/TopArtists" state={{ accessToken: props.accessToken }}>Top Artists</Link> |{" "}
      <Link to="/Inbox" state={{ accessToken: props.accessToken }}>Inbox</Link> |{" "}
      <Link to="/UserProfile" state={{ currUser: props.currUser, accessToken:props.accessToken }}>User Profile</Link> |{" "}
    </div>
  );
}

export default Navbar;