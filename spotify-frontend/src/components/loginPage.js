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