import React from 'react'
import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function DiscoverPage(props) {
  const [userData, setUserData] = useState();
  const [songs, setSongs]=useState();
  const [artists, setArtists]=useState();
  const [currUsername, setCurrUsername] = useState();
  const [user, setUser] = useState();
  const [topsongs, setTopSongs] = useState([]);
  const [topsongsY, setTopSongsY] = useState([]);
  const [topsongsM, setTopSongsM] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

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
    
    fetch("http://localhost:9000/users/usernameget?token=" + props.accessToken).then(res => res.json())
      .then(data => setCurrUsername(data.display_name))
    fetch("http://localhost:9000/users/trackAll?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongs(data.items))
    fetch("http://localhost:9000/users/trackYear?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongsY(data.items))
    fetch("http://localhost:9000/users/trackMonth?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongsM(data.items))
    fetch("http://localhost:9000/users?token=" + props.accessToken).then(res => res.json())
      .then(data => setLikedSongs(data.items))

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
    fetch("http://localhost:9000/users?token=" + props.accessToken).then(res => res.json())
      .then(data => setSongs(data.items))
      .catch((err)=>console.log(err));
  }

  const getTopArtists=()=>{
    fetch("http://localhost:9000/users/artists?token=" + props.accessToken).then(res => res.json())
      .then(data => setArtists(data.items))
      .catch((err)=>console.log(err));
  }
    

  useEffect(() => {
    if (userData && currUsername) {
      let found = false;
      for(let i = 0; i < userData.length; i++) {
        if (userData[i].spotifyUsername == currUsername) {
          setUser(userData[i])
          found = true
        }
      }
      if (!found) {
        const newUser = {
          spotifyUsername: currUsername,
          username: currUsername,
          isPublic: true,
          firstName: "Not Yet Registered",
          lastName: "Not Yet Registered",
          email: "Not Yet Registered",
          id: "Placeholder"
          }
        axios.post("http://localhost:9000/users/newuser", newUser)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
        setUser(newUser)
        }
      }
  }, [userData, currUsername]);

  const tableCell = (element) => {
    return (
      <tr>
        <td><Link to="/OtherUserComponent" state={{ user: element }}>{element.spotifyUsername}</Link> </td>
        <td><button type="button">Send Message</button></td>
      </tr>
    );
  }
  return (
    <div className="App">
      <h3> Welcome to this Discover Page! </h3>
      <h5> {"Currently logged in as: " + currUsername} </h5>
      <Navbar
        accessToken={props.accessToken}
        currUser={user}
        topSongs={topsongs}
        topSongsY={topsongsY}
        topSongsM={topsongsM}
        likedSongs={likedSongs}
      />
      <table>
        {userData && userData.map((user) => user.isPublic && tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;