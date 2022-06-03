import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import "../App.css";
import FilterList from './filterList.js'
import { useLocation } from 'react-router-dom';
import { AccessTokenContext } from "../Contexts/accessTokenContext";
import { buttonStyle } from './pagecss.js';
import { Box, Card, CardMedia, Typography, CardContent, createTheme, ThemeProvider } from '@mui/material/';


function Forum() {
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
  const location = useLocation();
  const { accessToken, currentUser, allUsers } = useContext(AccessTokenContext);

  const user = currentUser.username //need to change here DDDDDDD
  const [forumNames, setForumNames] = useState([]);
  const newForumNameRef = useRef(null);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    fetch("http://localhost:9000/forum/forums")
      .then((res) => res.json())
      .then((text) => setForumNames(text.result))
      .catch((err) => console.log(err))
  }, [])


  const addForum = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/forum/createForum", {
      forumName: newForumNameRef.current.value,
      creator: user
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))

    fetch("http://localhost:9000/forum/forums")
      .then((res) => res.json())
      .then((text) => setForumNames(text.result))
      .catch((err) => console.log(err))

    newForumNameRef.current.value = ""
  }

  return (
    <div className="Forum">
      <br />
      <br />
      <br />
      <ThemeProvider theme={theme}>

        <center>
          <h1 style={{ paddingTop: '25px' }}> Forum </h1>
          <Navbar setPage="Forum" /> <br></br>
          <div className="search">
            <TextField varient='outlined'
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              label="Search"
            /> <br></br> <br></br>  <br></br>
            <FilterList forumNames={forumNames} input={inputText} user={user} />
          </div>
          <hr></hr>
          <form onSubmit={addForum} >
            <h1 style={{ padding: '25px' }}>Create New Forum</h1>
            <TextField varient='outlined'
              id="outlined-basic"
              variant="outlined"
              label="New Forum"
              inputRef={newForumNameRef}
            /> <br></br><br></br>
            <Button type="submit"
              variant='contained' color="black"
              sx={{}}>Create New Forum<br></br>
            </Button>
          </form>
        </center>
      </ThemeProvider >

    </div>
  );
}

export default Forum;