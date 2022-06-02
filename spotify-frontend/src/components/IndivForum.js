import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Forum from './IndivForum.js'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {buttonStyle} from './pagecss.js';

function IndivForum() {
    const [forumPosts, setForumPosts]=useState([]);
    const location = useLocation();
    const forumName=location.state?.name
    const id=location.state?.id
    const creator=location.state?.creator
    const messageRef = useRef(null);
    const user=location.state?.currentUser

useEffect(() => {
   fetch("http://localhost:9000/forum/forumPosts?name=" + forumName)
  .then((res) => res.json())
  .then((text) => setForumPosts(text.result))
  .catch((err) => console.log(err))
}, [])

const likePost = async (id) => {
    axios.put("http://localhost:9000/forum/likePost", {
      id: id,
      user: user
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    window.location.reload(false);
  }

  const addPost = (e) => {
    console.log(user)
    e.preventDefault();  // no reloading the page
    var current = new Date();
    axios.post("http://localhost:9000/forum/postedInForum", {
      forumName: forumName,
      Message: messageRef.current.value,
      user: user,
      forumId: id
    })

    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    messageRef.current.value=""
    window.location.reload(false);
  }

  const timeString = (seconds) => {
    return new Date(seconds).toLocaleTimeString("en-US");
  }

  const numLikes = (likeArray) => {
      return likeArray.length;
  }

  const hasLiked = (likeArray) => {
      for (let i=0; i<likeArray.length; i++) {
          if(likeArray[i]===user) {
              return true;
          }
      }
      return false;
  }

  return (
    <div className="ForumPost">
    <Link to="/Forum" style={{
      margin: "20px"}}>Return to Forums</Link> 

        <header style={{
            margin: "20px"}}>
          <h1> {forumName} </h1>
          <div> <h3>Creator</h3></div>
          <p>{creator}</p>
        </header>
        <center>
          <form onSubmit={addPost} >
          <h1> New Post </h1>
          <textarea type="text" ref={messageRef} rows="2" cols="50"
                  style={{borderRadius: '25px'}}/>
                  <input type="submit" value="Post" style={buttonStyle}/>
          </form>
        </center>
        <hr></hr>
        <br></br>
        <br></br>
        <br></br>

    <center>
    {forumPosts && forumPosts.map((p) =>
        <div style={
            {
             border: '2px solid black'
            }
          }>
            <Grid> 
             <Typography>
                Posted By {p.poster} at {timeString(p.time.seconds)}:
                <p>{p.message}</p>

                {hasLiked(p.likers)  &&
                    <p>You have Liked This</p>
                }
                {!hasLiked(p.likers)  &&
                    <button type="submit" onClick={() => (likePost(p.id))}>Like</button> 
                }
                <p>Likes: {numLikes(p.likers)}</p>
                </Typography>
            </Grid>
            </div>
            
    )}
        </center>
        
    </div>
  );
}

export default IndivForum;