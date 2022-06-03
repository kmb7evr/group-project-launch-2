import React from 'react'
import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import axios from 'axios';

function DiscoverPage(props) {
  
  const { allUsers, currentUser, setCurrentUser, setAccessToken, accessToken } = useContext(AccessTokenContext);
  const [currentUsername, setCurrentUsername] = useState();

  const [topsongs, setTopSongs] = useState();
  const [topartists, setTopArtists] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
    .then(data => setCurrentUsername(data.display_name))

    getTopSongs();
    
    //.then((topsongs)=>updateSongs(topsongs, currentUser.id));//PROBLEM 3: topsongs doesn't update although I set it to update
    //console.log("top songs", topsongs);
    getTopArtists()
    // .then(updateArtists(currentUser.id))
    //console.log("top artists", topartists);

    },[]);

    useEffect(()=>{
      //updateSongs(topsongs, currentUser.id);
      //console.log("curr  id", currentUser.id)
      //updateSongs(topsongs, currentUser.id);
      if(topartists){
        console.log("artists", topartists)
      }
      
      
    },[topsongs, currentUser, topartists])


    

  useEffect(() => {
    if (currentUsername) {
      let found = false;
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].spotifyUsername == currentUsername) {
          setCurrentUser(allUsers[i])
          found = true
        }
      }
      if (!found) {
        const newUser = {
          spotifyUsername: currentUsername,
          username: currentUsername,
          isPublic: true,
          firstName: "Not Yet Registered",
          lastName: "Not Yet Registered",
          email: "Not Yet Registered",
          id: "Placeholder"
        }
        axios.post("http://localhost:9000/users/newuser", newUser)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err))
        setCurrentUser(newUser)
      }
      if(currentUser && topsongs){
        updateSongs(topsongs, currentUser.id);
        console.log("top songs", topsongs);
      }
      // if(currentUser && topartists){
      //   updateArtists(topartists, currentUser.id);
      // }

    }
  }, [currentUsername,  topsongs, topartists]);

  const getTopSongs= async ()=>{
    const apiResults= await fetch("http://localhost:9000/users/trackAll?token=" + accessToken);
    const apiJSON = await apiResults.json();
    //console.log("async-results", apiJSON.items);
    setTopSongs(apiJSON.items);
  }

  const getTopArtists= async ()=>{
    const apiResults= await fetch("http://localhost:9000/users/artistAll?token=" + accessToken);
    const apiJSON = await apiResults.json();
    //console.log("async-results", apiJSON.items);
    setTopArtists(apiJSON.items);
  }



  const updateSongs = async (topsongs, userID) => {
    
    if (topsongs) {
      let array;
      array = topsongs.slice(0, 10);
      array.map((element)=>
      axios
        .put("http://localhost:9000/users/put/songs", {
          id: userID,
          songs: element,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err)));
    }
  }

  const updateArtists = async (userID) => {

    if (topartists) {
      let array;
      array = topartists.slice(0, 10);
      array.map((element)=>
      axios
        .put("http://localhost:9000/users/getTopArtists", {
          id: userID,
          artists: element,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err)));
    }
  }

  const tableCell = (element) => {//NEW 2
    return (
      <tr>
        <td><Link to="/OtherUserComponent" state={{ user: element, songs: element.songs}}>{element.username}</Link> </td>
      </tr>
    );
  }

  return (
    <div className="App">
      <h3> Welcome to this Discover Page! </h3>
      <h5> {"Currently logged in as: " + (currentUser && currentUser.username)} </h5>
      <Navbar />
      <Button  onClick={() => setAccessToken("")}variant="contained">
        Log Out
      </Button>
      <table>
        {allUsers && allUsers.map((user) => user.isPublic && tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;