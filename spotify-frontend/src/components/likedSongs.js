import Navbar from "./navbar";
import { useState, useEffect, useContext } from "react";
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function LikedSongs() {
  const { accessToken } = useContext(AccessTokenContext);

  const [songs, setLikedSongs] = useState();

  useEffect(() => {
    console.log(accessToken)
    fetch("http://localhost:9000/users/likedSongs?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs(data.items))

  }, []);

  return (
    <div className="App">
      <br></br>
      <br></br>

      <br></br>
      <br></br>


      <h1> Liked Songs </h1>
      <Navbar setPage="Liked Songs"
      />


      {songs &&
        songs.map((val, key) => {
          return (<Box sx={{ display: "flex", justifyContent: 'center' }}>
            <Card sx={{
              display: 'flex',
              minWidth: 400,
              maxWidth: 400,
              justifyContent: 'right',
              m: 2


            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', flexGrow: 1 }}>
                <CardContent sx={{
                  flex: '1 0 auto',
                }}>
                  <Typography component="div" variant="h5">
                    {val.track.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {val.track.artists[0].name}
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  pl: 1
                }}
                image={val.track.album.images[0].url}
                alt={"album cover for" + val.track.album.name}
              />
            </Card>
          </Box >)
        })
      }
    </div>
  );
}

export default LikedSongs;