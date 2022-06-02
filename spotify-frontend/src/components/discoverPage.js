import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from "axios";

function DiscoverPage(props) {
  const { user, logout } = props;
  const [userData, setUserData] = useState();
  const [songs, setSongs]=useState();
  const [artists, setArtists]=useState();

  const { accessToken } = useContext(AccessTokenContext);
  useEffect(() => {
    fetch("http://localhost:9000/users/data")
      .then((res) => { return (res.json()); })
      .then((text) => { setUserData(text.result) })
      .catch((err) => console.log(err))

    //TODO: need a user post request first before adding songs and artists

    getTopSongs()
    .then(()=>{putSongs()});//if there's a mistake, it's probably here
    
    getTopArtists()
    .then(()=>{putArtists()});//if there's a mistake, it's probably here

  }, []);


  
  const putSongs = () => {
    axios.put("http://localhost:9000/users/post/songs", {
      songs: songs,
      spotifyUsername: "Liam McColley"//TODO: must change this to spotifyUsername
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
 
  }

  const putArtists = () => {
    axios.put("http://localhost:9000/users/post/artists", {
      artists: artists, 
      spotifyUsername: "Liam McColley"//TODO: must change this to spotifyUsername
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
 
  }


  const getTopSongs=()=>{
    fetch("http://localhost:9000/users?token=" + accessToken).then(res => res.json())
      .then(data => setSongs(data.items))
      .catch((err)=>console.log(err));
  }

  const getTopArtists=()=>{
    fetch("http://localhost:9000/users/artists?token=" + accessToken).then(res => res.json())
      .then(data => setArtists(data.items))
      .catch((err)=>console.log(err));
  }

  const tableCell = (element) => {
    return (
      <tr>


        <td><Link to="/OtherUserComponent" state={{ user: element }}>{element.username}</Link> </td>
        <td><button type="button">Send Message</button></td>
      </tr>
    );
  }
  return (
    <div className="App">
      <h3> Welcome to this Discover Page! </h3>
      <h5> {"Currently logged in as: " + user} </h5>
      <Navbar accessToken={props.accessToken} />
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
      <table>
        {userData && userData.map((user) => user.isPublic && tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;