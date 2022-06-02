import Navbar from "./navbar";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";


function TopSongs(props) {
  const location = useLocation();
  const user=location.state?.currUser
  const [songs, setSongs] = useState([])

  const accessToken = location.state?.accessToken;
  useEffect(() => {
    // console.log(props.accessToken)
    fetch("http://localhost:9000/users?token=" + accessToken).then(res => res.json())
      .then(data => setSongs(data.items))
  }, []);




  return (
    <div className="App">
      <h2> Top Songs </h2>
      <Navbar accessToken={props.accessToken} user={props.user} />
      {songs.length > 0 &&
        songs.map((val, key) => {
          return <p>{val.track.name} by {val.track.artists[0].name}</p>
        })
      }
    </div>
  );
}

export default TopSongs;