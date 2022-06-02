import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import "../App.css";
import FilterList from './filterList.js'

function Forum() {
  const [forumNames, setForumNames]=useState([]);
  const newForumNameRef = useRef(null);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
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
    creator: "curr user",
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err))

  newForumNameRef.current.value=""
  window.location.reload(false);
}

  return (

    <div className="Forum">
        <center>
          <h2> Forum </h2>
          <Navbar /> <br></br>

          <div className="search">
            <TextField varient='outlined'
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              label="Search"
            /> <br></br> <br></br>  <br></br> 
            <FilterList forumNames={forumNames} input={inputText} />
          </div>
          <form onSubmit={addForum} >
              <h1>Create New Forum</h1>
              <input type="text" ref={newForumNameRef}/> <br></br><br></br>
              <input type="submit" value="Create New Forum"/>
          </form>
        </center>

    </div>
  );
}

export default Forum;