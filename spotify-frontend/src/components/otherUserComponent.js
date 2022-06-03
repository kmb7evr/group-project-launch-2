import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { Box, Card, CardMedia, Typography, CardContent } from '@mui/material/';

function OtherUserComponent() {

  const location = useLocation();
  const { user, songs } = location.state;//NEW 3
  const [privacy, setPrivacy] = useState(user.isPublic)

  const switchPrivacy = () => {
    /* TODO: connect to firebase and update the isPublic boolean*/
    if (privacy) {
      setPrivacy(false)
    }
    else {
      setPrivacy(true)
    }
  }
    return (
      <div className="App">
        <h2> {user.username}'s Profile </h2>
        <Navbar />
        <table>
          <tr>
            <td>Username: </td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>First name: </td>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <td>Last name: </td>
            <td>{user.lastName} </td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{user.email} </td>
          </tr>
        </table>
        <h1>Top Songs</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box>
            {songs &&
              songs.map((val, key) => {
                return (
                  <Box>
                    <Card
                      sx={{
                        display: "flex",
                        minWidth: 400,
                        maxWidth: 400,
                        justifyContent: "right",
                        m: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "left",
                          flexGrow: 1,
                        }}
                      >
                        <CardContent
                          sx={{
                            flex: "1 0 auto",
                          }}
                        >
                          <Typography component="div" variant="h5">
                            {val.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {val.artists[0].name}
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 200,
                          pl: 1,
                        }}
                        image={val.album.images[0].url}
                        alt={"album cover for" + val.album.name}
                      />
                    </Card>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </div>
    );
  }
  
  export default OtherUserComponent;