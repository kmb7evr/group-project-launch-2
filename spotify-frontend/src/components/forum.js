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

function Forum() {
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

      <center>
        <h1> Forum </h1>
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
          <h1>Create New Forum</h1>
          <textarea type="text" ref={newForumNameRef} rows="2" cols="50" /> <br></br>
          <Button type="submit"
            variant='outlined'
            sx={{ color: '#000000', borderColor: '#000000' }}>Create New Forum<br></br>
          </Button>
        </form>
      </center>

    </div>
  );
}

export default Forum;