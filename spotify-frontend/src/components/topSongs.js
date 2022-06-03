import Navbar from "./navbar";
import { useState, useEffect, useContext } from "react";
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function TopSongs(props) {

  const [songs, setTopSongs] = useState();
  const [yearSongs, setTopSongsY] = useState();
  const [monthSongs, setTopSongsM] = useState();

  const { accessToken } = useContext(AccessTokenContext);
  useEffect(() => {
    fetch("http://localhost:9000/users/trackAll?token=" + accessToken).then(res => res.json())
      .then(data => setTopSongs(data.items))
    fetch("http://localhost:9000/users/trackYear?token=" + accessToken).then(res => res.json())
      .then(data => setTopSongsY(data.items))
    fetch("http://localhost:9000/users/trackMonth?token=" + accessToken).then(res => res.json())
      .then(data => setTopSongsM(data.items))

  }, [])



  return (
    <div className="App">
      <Navbar
        setPage="Top Songs" />
      <br />
      <br />
      <br />
      <h1>Top Songs</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Typography component="div" variant="h5">
          All Time
        </Typography>
        <Typography component="div" variant="h5">
          Last Year
        </Typography>
        <Typography component="div" variant="h5">
          Last Month
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Box>

          {songs &&
            songs.map((val, key) => {
              return (<Box>
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
                        {val.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {val.artists[0].name}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.album.images[0].url}
                    alt={"album cover for" + val.album.name}
                  />
                </Card>


              </Box >)



            })
          }
        </Box>

        <Box>
          {yearSongs &&
            yearSongs.map((val, key) => {
              return (<Box>
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
                        {val.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {val.artists[0].name}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.album.images[0].url}
                    alt={"album cover for" + val.album.name}
                  />
                </Card>


              </Box >)



            })
          }
        </Box>
        <Box>
          {monthSongs &&
            monthSongs.map((val, key) => {
              return (<Box>
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
                        {val.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {val.artists[0].name}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.album.images[0].url}
                    alt={"album cover for" + val.album.name}
                  />
                </Card>


              </Box >)



            })
          }
        </Box>
      </Box>
    </div >
  );
}

export default TopSongs;