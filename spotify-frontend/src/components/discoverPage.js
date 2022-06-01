import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";
import {useState, useEffect} from 'react';
import { Link, Outlet } from 'react-router-dom';

function DiscoverPage(props) {
    const {user, logout} = props;
    const [userData, setUserData]=useState();

    useEffect(()=>{
      fetch("http://localhost:9000/users/data")
    .then((res) => {return (res.json());})
    .then((text) => {setUserData(text.result)})
    .catch((err) => console.log(err))
    },[]);

    const tableCell=(element)=>{
      return (
      <tr>
        <td><Link to="/OtherUserComponent" state={{user: element}}>{element.username}</Link> </td>{/*TODO: make this a link to the user's profile */}
        <td><button type="button">Send Message</button></td>
      </tr>
      );
    }
  return (
    <div className="App">
      <h3> Welcome to this Discover Page! </h3>
      <h5> {"Currently logged in as: " + user} </h5>
      <Navbar />
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
      <table>
        {userData && userData.map((user) => tableCell(user))}
      </table>
    </div>
  );
}

export default DiscoverPage;