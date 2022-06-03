import Navbar from "./navbar";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import { Box, Card, CardMedia, Typography, CardContent, createTheme, ThemeProvider } from '@mui/material/';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Inbox() {
  const { accessToken, currentUser, allUsers } = useContext(AccessTokenContext);
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
  const [convPart, setConvPart] = useState("");
  const location = useLocation();
  const [contactList, setContactList] = useState([]);
  const newConversationRef = useRef(null);
  const userName = currentUser.username //need to change here DDDDDDD
  const [userNamesOnly, setuserNamesOnly] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/inbox/getUsers")
      .then((res) => res.json())
      .then((text) => setuserNamesOnly(text.result))
      .catch((err) => console.log(err))

    fetch("http://localhost:9000/inbox/conversations?name=" + userName)
      .then((res) => res.json())
      .then((text) => setContactList(text.result))
      .catch((err) => console.log(err))

  }, [])

  const setPartner = (e) => {
    e.preventDefault();
    setConvPart(newConversationRef.current.value)
    newConversationRef.current.value = ""
  }

  return ( //need to add datalist capabilities
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      <ThemeProvider theme={theme}>
        <h1> Inbox </h1>
        <Navbar setPage="Inbox" /> <br></br>
        <form onSubmit={setPartner}>
          <Autocomplete

            disablePortal
            options={userNamesOnly}
            renderInput={(params) => <TextField
              sx={{
                width: '30vw',
                margin: '10px'
              }}
              {...params}
              label="Users"
              inputRef={newConversationRef}
            />}
          />
          <Button variant="contained" color="black" type="submit" value="Start Conversation" sx={{
            margin: '10px'
          }}>  Start Conversation</Button>
        </form>

        {convPart !== "" && //may need to change that
          <Link to='Conversation' state={{ contact: convPart, userName: userName }} style={{ textDecoration: 'none' }}>
            <Button
              variant='outlined'
              sx={{ color: '#000000', borderColor: '#000000' }}>Start New Conversation With: {convPart}<br></br>
            </Button>
            <br></br>
          </Link>
        }

        <h1 style={{ padding: '25px' }}>Conversations: </h1>
        {contactList.map((contact, index) =>
          <Link to='Conversation' state={{ contact: contact, userName: userName }} style={{ margin: '25px', textDecoration: 'none' }}>
            <Button
              variant='contained' color="black"
              sx={{ color: "black", margin: '5px', padding: '15px' }}>{contact}<br></br>
            </Button>
            <br></br>
          </Link>)
        }
      </ThemeProvider >
    </div>

  );
}

export default Inbox;