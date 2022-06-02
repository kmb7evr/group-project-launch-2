import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function LoginPage(props) {
  const { accessToken, allUsers, currentUser } = useContext(AccessTokenContext);



  const { setAccessToken, setAllUsers, setCurrentUser } = useContext(AccessTokenContext);
  const [currUsername, setCurrUsername] = useState();



  const navigate = useNavigate();


  const onClick = (e) => {

    fetch("http://localhost:9000/auth").then(res => res.json())
      .then(data => {
        window.open(data.url)
      })

  }

  const path = window.location.href.split('/')[3]
  let code = ''

  useEffect(() => {
    if (path) {
      code = path.split('=')[1]
      fetch('http://localhost:9000/auth/callback?code=' + code).then(res => res.json()).then(data => {
        if (data.token) {
          setAccessToken(data.token);
        }
      })
    }
    fetch("http://localhost:9000/users/data")
      .then((res) => { return (res.json()); })
      .then((text) => { setAllUsers(text.result) })
      .catch((err) => console.log(err))

  }, [])

  useEffect(() => {
    fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
      .then(data => setCurrUsername(data.display_name))
  }, []);

  useEffect(() => {
    if (allUsers && currUsername) {
      let found = false;
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].spotifyUsername == currUsername) {
          setCurrentUser(allUsers[i])
          console.log(currentUser);
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
        setCurrentUser(newUser)
      }
    }
  }, [allUsers, currUsername]);

  return (
    <>
      <br />
      <Box display='flex' flexDirection='column'>
        <Button onClick={(e) => onClick(e)} variant="contained">Log Into Spotify</Button>
      </Box>
    </>
  );
}

export default LoginPage;