import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { unstable_createMuiStrictModeTheme } from "@mui/material";

function UserProfile() {

    const location = useLocation();
    const user=location.state?.currUser
    const [privacy, setPrivacy] = useState(user.isPublic)
    console.log(user.id)

    const switchPrivacy = async (userID) => {
        const bool = (!privacy)
        setPrivacy(bool)
        axios.put("http://localhost:9000/users/privacy", {
          id: userID,
          isPublic: bool
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
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
          <button type="button">Save Changes</button>
          <td> {privacy ? "Your profile is currently PUBLIC. Would you like to switch to PRIVATE?" : "Your profile is current PRIVATE. Would you like to switch to PUBLIC?"} </td>
          <button type="button" onClick={() => switchPrivacy(user.id)}>Yes, switch my privacy settings </button>
      </div>
    );
  }
  
  export default UserProfile;