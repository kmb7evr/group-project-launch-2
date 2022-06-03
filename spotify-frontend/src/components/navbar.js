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
      <Link to="/" >Home</Link> |{" "}
      <Link to="/Forum" >Forum</Link> |{" "}
      <Link to="/LikedSongs" >Liked Songs</Link> |{" "}
      <Link to="/TopSongs" >Top Songs</Link> |{" "}
      <Link to="/TopArtists" >Top Artists</Link> |{" "}
      <Link to="/Inbox" >Inbox</Link> | {" "}
      <Link to="/UserProfile" >User Profile</Link> {" "}
      <Link to="/Logout" >Log Out</Link> {" "}
    </div>
  );
}

export default Navbar;