import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import { Box, Card, CardMedia, Typography, CardContent, Button, TextField, createTheme, ThemeProvider } from '@mui/material/';



function UserProfile() {
  const { accessToken, allUsers, currentUser } = useContext(AccessTokenContext);
  const [privacy, setPrivacy] = useState(currentUser.isPublic)
  const [username1, setUsername1] = useState(currentUser.username)
  const [firstName1, setFirstName1] = useState(currentUser.firstName)
  const [lastName1, setLastName1] = useState(currentUser.lastName)
  const [email1, setEmail1] = useState(currentUser.email)
  const userRef1 = useRef();
  const userRef2 = useRef();
  const userRef3 = useRef();
  const userRef4 = useRef();


  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
      selected: {
        main: '#1DB954',
        contrastText: '#fff',
      },
      black: {
        main: '#000000',
        contrastText: '#fff',
      },
    },
  });
  const updateUsername = async (userID) => {
    const val = userRef1.current.value;
    axios.put("http://localhost:9000/users/username", {
      id: userID,
      username: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef1.current.value = "";
    setUsername1(val)
    currentUser.username = val
  }

  const updateFirstName = async (userID) => {
    const val = userRef2.current.value;
    axios.put("http://localhost:9000/users/firstname", {
      id: userID,
      firstName: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef2.current.value = "";
    setFirstName1(val)
    currentUser.firstName = val
  }

  const updateLastName = async (userID) => {
    const val = userRef3.current.value;
    axios.put("http://localhost:9000/users/lastname", {
      id: userID,
      lastName: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef3.current.value = "";
    setLastName1(val)
    currentUser.lastName = val
  }

  const updateEmail = async (userID) => {
    const val = userRef4.current.value;
    axios.put("http://localhost:9000/users/email", {
      id: userID,
      email: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef4.current.value = "";
    setEmail1(val)
    currentUser.email = val
  }

  const switchPrivacy = async (userID) => {
    const bool = (!privacy)
    setPrivacy(bool)
    axios.put("http://localhost:9000/users/privacy", {
      id: userID,
      isPublic: bool
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    currentUser.isPublic = bool
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar setPage="User Profile" />
        <br />
        <br />
        <br />
        <br />
        <h1> {currentUser.username}'s Profile </h1>
        <Box sx={{
          display: 'flex',
          justifyContent: "center"
        }}>
          <Card
            sx={{
              display: 'flex',
              maxWidth: 700,
              justifyContent: 'Center',
              m: 2,
              style: { backgroundColor: "neutral" }


            }}>
            <table>
              <tr>
                <td><Typography>Spotify Username: </Typography></td>
                <td>
                  <Typography>{currentUser.spotifyUsername}</Typography></td>
              </tr>
              <tr>
                <td><Typography>Username: </Typography></td>
                <td><Typography >{username1}</Typography></td>
                <TextField size="small" ref={userRef1} placeholder={"Edit Username..."} />
                <Button variant="contained" color="selected" onClick={() => updateUsername(currentUser.id)} >Change</Button>
              </tr>
              <tr>
                <td><Typography>First name: </Typography></td>
                <td><Typography>{firstName1}</Typography></td>
                <TextField size="small" ref={userRef2} placeholder={"Edit First Name..."} />
                <Button variant="contained" color="selected" onClick={() => updateFirstName(currentUser.id)} >Change</Button>
              </tr>
              <tr>
                <td><Typography>Last name: </Typography></td>
                <td><Typography>{lastName1} </Typography></td>
                <TextField size="small" ref={userRef3} placeholder={"Edit Last Name..."} />
                <Button variant="contained" color="selected" onClick={() => updateLastName(currentUser.id)} >Change</Button>
              </tr>
              <tr>
                <td><Typography>Email: </Typography></td>
                <td><Typography>{email1} </Typography></td>
                <TextField size="small" ref={userRef4} placeholder={"Edit Email..."} />
                <Button variant="contained" color="selected" onClick={() => updateEmail(currentUser.id)} >Change</Button>
              </tr>
              \
            </table>

          </Card>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: "space-around",
          mx: 95
        }}>
          <Button variant="contained" color="selected" type="button">Save Changes</Button>
          <td><Typography> {privacy ? "Your profile is currently PUBLIC. Would you like to switch to PRIVATE?" : "Your profile is current PRIVATE. Would you like to switch to PUBLIC?"} </Typography></td>
          <Button variant="contained" color="selected" type="button" onClick={() => switchPrivacy(currentUser.id)}>Yes, switch my privacy settings </Button>
        </Box>


      </div>
    </ThemeProvider >
  );
}

export default UserProfile;