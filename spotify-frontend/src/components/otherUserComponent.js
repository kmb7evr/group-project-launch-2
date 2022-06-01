import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'
import { useState } from 'react';

function OtherUserComponent() {

  const location = useLocation();
  const { user } = location.state;
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
          <button type="button">Save Changes</button>
          <td> {privacy ? "Your profile is currently PUBLIC. Would you like to switch to PRIVATE?" : "Your profile is current PRIVATE. Would you like to switch to PUBLIC?"} </td>
          <button type="button" onClick={switchPrivacy}>Yes, switch my privacy settings </button>
      </div>
    );
  }
  
  export default OtherUserComponent;