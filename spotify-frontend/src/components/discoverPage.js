import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";
import { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

function DiscoverPage(props) {
  const { user, logout } = props;
  const [userData, setUserData] = useState();

  const [topsongs, setTopSongs] = useState([]);
  const [topsongsY, setTopSongsY] = useState([]);
  const [topsongsM, setTopSongsM] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);


  const { accessToken } = useContext(AccessTokenContext);
  useEffect(() => {
    fetch("http://localhost:9000/users/data")
      .then((res) => { return (res.json()); })
      .then((text) => { setUserData(text.result) })
      .catch((err) => console.log(err))
    fetch("http://localhost:9000/users/trackAll?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongs(data.items))
    fetch("http://localhost:9000/users/trackYear?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongsY(data.items))
    fetch("http://localhost:9000/users/trackMonth?token=" + props.accessToken).then(res => res.json())
      .then(data => setTopSongsM(data.items))
    fetch("http://localhost:9000/users?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs(data.items))
  }, []);

  const tableCell = (element) => {
    return (
      <tr>


        <td><Link to="/OtherUserComponent" state={{ user: element }}>{element.username}</Link> </td>
        <td><button type="button">Send Message</button></td>
      </tr>
    );
  }
  return (
    <div className="App">
      <h3> Welcome to this Discover Page! </h3>
      <h5> {"Currently logged in as: " + user} </h5>
      <Navbar
        accessToken={props.accessToken}
        topSongs={topsongs}
        topSongsY={topsongsY}
        topSongsM={topsongsM}
        likedSongs={likedSongs}
      />
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
      <table>
        {userData && userData.map((user) => user.isPublic && tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;