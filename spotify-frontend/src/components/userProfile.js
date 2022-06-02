import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function UserProfile() {
  const { accessToken, allUsers, currentUser } = useContext(AccessTokenContext);

  const location = useLocation();
  const [user, setUser] = useState();
  const [privacy, setPrivacy] = useState(user.isPublic)
  const [username1, setUsername1] = useState(user.username)
  const [firstName1, setFirstName1] = useState(user.firstName)
  const [lastName1, setLastName1] = useState(user.lastName)
  const [email1, setEmail1] = useState(user.email)
  const userRef1 = useRef();
  const userRef2 = useRef();
  const userRef3 = useRef();
  const userRef4 = useRef();

  useEffect(() => {
    // fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
    //   .then(data => setUsername(data.display_name))

  }, [])





  const updateUsername = async (userID) => {
    const val = userRef1.current.value;
    axios.put("http://localhost:9000/users/username", {
      id: userID,
      username: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef1.current.value = "";
    setUsername1(val)
  }

  const updateFirstName = async (userID) => {
    const val = userRef2.current.value;
    axios.put("http://localhost:9000/users/firstname", {
      id: userID,
      firstName: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef2.current.value = "";
    setFirstName1(val)
  }

  const updateLastName = async (userID) => {
    const val = userRef3.current.value;
    axios.put("http://localhost:9000/users/lastname", {
      id: userID,
      lastName: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef3.current.value = "";
    setLastName1(val)
  }

  const updateEmail = async (userID) => {
    const val = userRef4.current.value;
    axios.put("http://localhost:9000/users/email", {
      id: userID,
      email: val
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    userRef4.current.value = "";
    setEmail1(val)
  }

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
      <h2> {currentUser.username}'s Profile </h2>
      <Navbar />
      <table>
        <tr>
          <td>Spotify Username: </td>
          <td>{currentUser.spotifyUsername}</td>
        </tr>
        <tr>
          <td>Username: </td>
          <td>{username1}</td>
          <input ref={userRef1} placeholder={"Edit Username..."} />
          <button onClick={() => updateUsername(currentUser.id)} >Change</button>
        </tr>
        <tr>
          <td>First name: </td>
          <td>{firstName1}</td>
          <input ref={userRef2} placeholder={"Edit First Name..."} />
          <button onClick={() => updateFirstName(currentUser.id)} >Change</button>
        </tr>
        <tr>
          <td>Last name: </td>
          <td>{lastName1} </td>
          <input ref={userRef3} placeholder={"Edit Last Name..."} />
          <button onClick={() => updateLastName(currentUser.id)} >Change</button>
        </tr>
        <tr>
          <td>Email: </td>
          <td>{email1} </td>
          <input ref={userRef4} placeholder={"Edit Email..."} />
          <button onClick={() => updateEmail(currentUser.id)} >Change</button>
        </tr>
      </table>
      <button type="button">Save Changes</button>
      <td> {privacy ? "Your profile is currently PUBLIC. Would you like to switch to PRIVATE?" : "Your profile is current PRIVATE. Would you like to switch to PUBLIC?"} </td>
      <button type="button" onClick={() => switchPrivacy(currentUser.id)}>Yes, switch my privacy settings </button>
    </div>
  );
}

export default UserProfile;