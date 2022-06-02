import Navbar from "./navbar";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';


function TopSongs() {
  const location = useLocation();

  const songs = location.state?.songs;
  const yearSongs = location.state?.yearSongs;
  const monthSongs = location.state?.monthSongs;







  return (
    <div className="App">
      <Navbar />
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

          {songs.length > 0 &&
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
          {yearSongs.length > 0 &&
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
          {monthSongs.length > 0 &&
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