import React from 'react'
import { Button, Typography, Box, Badge } from '@mui/material';
import Navbar from "./navbar";
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import axios from 'axios';

function DiscoverPage(props) {

  const { allUsers, currentUser, setCurrentUser, setAccessToken, accessToken } = useContext(AccessTokenContext);
  const [currentUsername, setCurrentUsername] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
      .then(data => setCurrentUsername(data.display_name))
  }, []);

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
    }
  }, [currentUsername]);

  const tableCell = (element) => {
    return (
      <tr>
        <td>
          <Button variant="outlined" sx={{ color: 'white', backgroundColor: 'white' }} >
            <Link to="/OtherUserComponent" state={{ user: element }}>{element.username}</Link> 
            </Button>
            </td>
      </tr>
    );
  }

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />

      <h1> Welcome to your Spotify Discover Page! </h1>
      <h3> {"Currently logged in as: " + (currentUser && currentUser.username)} </h3>
      <Navbar setPage="Home" />
      <table>
        {allUsers && allUsers.map((user) => user.isPublic && tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;