import Navbar from "./navbar";
import { useState, useEffect, useContext } from "react";
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';
import { AccessTokenContext } from "../Contexts/accessTokenContext";

function TopArtists() {
  const [artists, setTopArtists] = useState();
  const [yearArtists, setTopArtistsY] = useState();
  const [monthArtists, setTopArtistsM] = useState();
  const { accessToken } = useContext(AccessTokenContext);
  useEffect(() => {
    fetch("http://localhost:9000/users/artistAll?token=" + accessToken).then(res => res.json())
      .then(data => setTopArtists(data.items))
    fetch("http://localhost:9000/users/artistYear?token=" + accessToken).then(res => res.json())
      .then(data => setTopArtistsY(data.items))
    fetch("http://localhost:9000/users/artistMonth?token=" + accessToken).then(res => res.json())
      .then(data => setTopArtistsM(data.items))

  }, [])
  return (
    <div className="App">
      <Navbar setPage="Top Artists" />
      <br />
      <br />
      <br />
      <h1>Top Artists</h1>
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

          {artists &&
            artists.map((val, key) => {
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

                    </CardContent>
                  </Box>
                  {val.images.length > 0 && <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.images[0].url}
                    alt={"album cover for" + val.name}
                  />}
                </Card>


              </Box >)



            })
          }
        </Box>

        <Box>
          {yearArtists &&
            yearArtists.map((val, key) => {
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

                    </CardContent>
                  </Box>
                  {val.images.length > 0 && <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.images[0].url}
                    alt={"album cover for" + val.name}
                  />}
                </Card>


              </Box >)



            })
          }
        </Box>
        <Box>
          {monthArtists &&
            monthArtists.map((val, key) => {
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

                    </CardContent>
                  </Box>
                  {val.images.length > 0 && <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      pl: 1
                    }}
                    image={val.images[0].url}
                    alt={"album cover for" + val.name}
                  />}
                </Card>


              </Box >)



            })
          }
        </Box>
      </Box>
    </div>
  );
}

export default TopArtists;