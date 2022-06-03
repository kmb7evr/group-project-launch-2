import Navbar from "./navbar";
import { useState, useEffect, useContext } from "react";
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function LikedSongs() {
  const { accessToken } = useContext(AccessTokenContext);

  const [songs, setLikedSongs] = useState();
  const [songs1, setLikedSongs1] = useState();
  const [songs2, setLikedSongs2] = useState();


  useEffect(() => {
    fetch("http://localhost:9000/users/likedSongs?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs(data.items))
    fetch("http://localhost:9000/users/likedSongs?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs1(data.items))
    fetch("http://localhost:9000/users/likedSongs?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs2(data.items))

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

      <Box
        sx={{
          display: 'flex',
          justifyContent: "center",
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'inherit',
          maxWidth: 1920,
          borderRadius: 1,
        }}
      >
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
        {songs1 &&
          songs1.map((val, key) => {
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
        {songs2 &&
          songs2.map((val, key) => {
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
      </Box>
    </div>
  );
}

export default LikedSongs;