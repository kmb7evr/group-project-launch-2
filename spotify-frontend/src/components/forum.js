import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IndivForum from './IndivForum.js'

function Forum() {
  const [forumNames, setForumNames]=useState([]);
  const newForumNameRef = useRef(null);

useEffect(() => {
  fetch("http://localhost:9000/forum/forums")
  .then((res) => res.json())
  .then((text) => setForumNames(text.result))
  .catch((err) => console.log(err))

  console.log(forumNames)
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
    <center>
    <div className="Forum">
        <h2> Forum </h2>
        <Navbar /> <br></br>
        {forumNames.map((f) => 
          <Link to='IndivForum' state={{ id: f.id, name: f.forumName, creator: f.creator, currentUser: "testUser"}}>

            <Button
            variant='outlined'
            sx={{ color: '#000000', borderColor: '#000000' }}>{f.forumName} <br></br>
            Created By: {f.creator}<br></br>
            Posts: {f.posts}<br></br>
            </Button>
            <br></br>
            
          </Link>)
          
        }
        <form onSubmit={addForum} >
            <h1>Create New Forum</h1>
            <input type="text" ref={newForumNameRef}/> <br></br><br></br>
            <input type="submit" value="Create New Forum"/>
        </form>

    </div>
    </center>
  );
}

export default Forum;
