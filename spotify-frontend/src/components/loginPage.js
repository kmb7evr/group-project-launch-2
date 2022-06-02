import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
  const { setUsername, setAccessToken } = props;
  const userRef = useRef();

  // const getUsername = () => {

  //   console.log(val)
  // }
  const [isOnclick, setIsOnClick] = useState(true);
  // const [token1, setToken] = useState();


  const loginFunction = (e) => {
    if (isOnclick) {
      onClick(e)
    }
    // getUsername();

  }
  const navigate = useNavigate();
  // const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  // const [accessToken, setAccessToken] = useState(AccessTokenContext);


  const onClick = (e) => {

    fetch("http://localhost:9000/auth").then(res => res.json())
      .then(data => {
        window.open(data.url)
        // const val = userRef.current.value;
        // setUsername(val)
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
          //console.log(data.token)
          // navigate('/home')
        }
        //setAccessToken(data.access_token)
        //setRefreshToken(data.refresh_token)    
      })
    }

  }, [])









  return (
    <>

      <Box display='flex' flexDirection='column'>
        <Typography variant='h5'>Enter Username</Typography>
        <TextField inputRef={userRef} variant="outlined" />
        <Button onClick={(e) => onClick(e)} variant="contained">Submit</Button>
      </Box>
    </>
  );
}

export default LoginPage;