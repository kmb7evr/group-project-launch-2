import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Forum from './IndivForum.js'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { buttonStyle } from './pagecss.js';
import LikeButton from './likeButton.js'
import TextField from "@mui/material/TextField";
import { Box, Card, CardMedia, CardContent, createTheme, ThemeProvider } from '@mui/material/';


function IndivForum() {
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
  const [forumPosts, setForumPosts] = useState([]);
  const location = useLocation();
  const forumName = location.state?.name
  const id = location.state?.id
  const creator = location.state?.creator
  const messageRef = useRef(null);
  const user = location.state?.currentUser

  useEffect(() => {
    fetch("http://localhost:9000/forum/forumPosts?name=" + forumName)
      .then((res) => res.json())
      .then((text) => setForumPosts(text.result))
      .catch((err) => console.log(err))
  }, [])

  const likePost = async (id) => {
    await axios.put("http://localhost:9000/forum/likePost", {
      id: id,
      user: user
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))

    fetch("http://localhost:9000/forum/forumPosts?name=" + forumName)
      .then((res) => res.json())
      .then((text) => setForumPosts(text.result))
      .catch((err) => console.log(err))
  }

  const addPost = (e) => {
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

    fetch("http://localhost:9000/forum/forumPosts?name=" + forumName)
      .then((res) => res.json())
      .then((text) => setForumPosts(text.result))
      .catch((err) => console.log(err))

    messageRef.current.value = ""
  }

  const timeString = (seconds) => {
    return new Date(seconds).toLocaleTimeString("en-US");
  }

  const numLikes = (likeArray) => {
    return likeArray.length;
  }

  const hasLiked = (likeArray) => {
    for (let i = 0; i < likeArray.length; i++) {
      if (likeArray[i] === user) {
        return true;
      }
    }
    return false;
  }

  return (

    <div className="ForumPost">
      <ThemeProvider theme={theme}>

        <div style={{ border: '0.1px solid black' }}>
          <br></br>
          <div style={{ border: '0.1px solid black' }}>
            <Link to="/Forum" style={{
              margin: "20px"
            }}>Return to Forums</Link>
            <header style={{
              margin: "20px"
            }}>
              <h1> {forumName} </h1>
              <div> <h3>Creator</h3></div>
              <p>{creator}</p>
            </header>
          </div>
        </div>
        <center>
          <form onSubmit={addPost} >
            <h1 style={{ padding: "10px" }}> New Post </h1> <br></br>


            <TextField varient='outlined'
              id="outlined-basic"
              variant="outlined"
              label="New Post"
              inputRef={messageRef}
            /> <br></br> <br></br>

            <Button type="submit"
              variant='outlined' color="black"
              sx={{}}>Post<br></br>
            </Button>
          </form>
        </center>
        <br></br>
        <br></br>


        <center>
          {forumPosts && forumPosts.map((p) =>
            <div style={
              {
                border: '1px solid black',
                borderRadius: '25px',
                display: 'block',
                padding: '10px',
              }
            }>
              <Grid>
                <Typography>
                  <h1>{p.message}</h1>
                  <LikeButton id={p.id} user={p.poster} likers={p.likers} likePost={likePost} />
                  {numLikes(p.likers) !== 1 &&
                    <div>{" "}{numLikes(p.likers)} Likes</div>
                  }
                  {numLikes(p.likers) === 1 &&
                    <div>{" "}{numLikes(p.likers)} Like</div>
                  }
                  Posted By {p.poster}
                </Typography>
              </Grid><br></br>
            </div>
          )}
        </center>
      </ThemeProvider >

    </div>
  );
}

export default IndivForum;