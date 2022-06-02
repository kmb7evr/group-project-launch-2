import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
  const { setAccessToken } = props;
  const userRef = useRef();
  const [isOnclick, setIsOnClick] = useState(true);


  const loginFunction = (e) => {
    if (isOnclick) {
      onClick(e)
    }
  }
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

  }, [])

  return (
    <>
      <br/>
      <Box display='flex' flexDirection='column'>
        <Button onClick={(e) => onClick(e)} variant="contained">Log Into Spotify</Button>
      </Box>
    </>
  );
}

export default LoginPage;