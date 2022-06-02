import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {
  const [accessToken, setAccessToken] = useState();
  // const [topsongs, setTopSongs] = useState([]);
  // const [topsongsY, setTopSongsY] = useState([]);

  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/users/data")
      .then((res) => { return (res.json()); })
      .then((text) => { setUserData(text.result) })
      .catch((err) => console.log(err))
    // fetch("http://localhost:9000/users/trackAll?token=" + props.accessToken).then(res => res.json())
    //   .then(data => setTopSongs(data.items))
    // fetch("http://localhost:9000/users/trackYear?token=" + props.accessToken).then(res => res.json())
    //   .then(data => console.log(data.items))
  }, []);


  return (
    <div className="App">
      <Link to="/" state={{ accessToken: props.accessToken }}>Home</Link> |{" "}
      <Link to="/Forum" state={{ accessToken: props.accessToken }}>Forum</Link> |{" "}
      <Link to="/LikedSongs" state={{ accessToken: props.accessToken, songs: props.likedSongs }}>Liked Songs</Link> |{" "}
      <Link to="/TopSongs" state={{ accessToken: props.accessToken, songs: props.topSongs, yearSongs: props.topSongsY, monthSongs: props.topSongsM }}>Top Songs</Link> |{" "}
      <Link to="/TopArtists" state={{ accessToken: props.accessToken }}>Top Artists</Link> |{" "}
      <Link to="/Inbox" state={{ accessToken: props.accessToken }}>Inbox</Link> {" "}
    </div>
  );
}

export default Navbar;