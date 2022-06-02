import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {

  return (
    <div className="App">
      <Link to="/" state={{ accessToken: props.accessToken }}>Home</Link> |{" "}
      <Link to="/Forum" state={{ accessToken: props.accessToken }}>Forum</Link> |{" "}
      <Link to="/LikedSongs" state={{ accessToken: props.accessToken }}>Liked Songs</Link> |{" "}
      <Link to="/TopSongs" state={{ currUser: props.user, accessToken: props.accessToken }}>Top Songs</Link> |{" "}
      <Link to="/TopArtists" state={{ accessToken: props.accessToken }}>Top Artists</Link> |{" "}
      <Link to="/Inbox" state={{ accessToken: props.accessToken }}>Inbox</Link> |{" "}
      <Link to="/UserProfile" state={{ currUser: props.user, accessToken: props.accessToken }} >User Profile</Link> |{" "}
    </div>
  );
}

export default Navbar;