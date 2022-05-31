import { TextField, Box, Button, Typography } from '@mui/material'
import React, { useRef } from 'react'

function LoginPage(props) {
    const {setUsername} = props;
    const userRef = useRef();
  
    const getUsername = () => {
      const val = userRef.current.value;
      setUsername(val)
      console.log(val)
    }

  return (
    <Box  display='flex' flexDirection='column'>
      <Typography variant='h5'>Enter Username</Typography>
      <TextField inputRef={userRef} variant="outlined" />
      <Button onClick={getUsername} variant="contained">Submit</Button>
    </Box>
  );
}

export default LoginPage;