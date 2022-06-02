import Navbar from "./navbar";
import { useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function LikedSongs() {
  const { accessToken } = useContext(AccessTokenContext);

  const [songs, setLikedSongs] = useState([]);






  useEffect(() => {
    fetch("http://localhost:9000/users/likedSongs?token=" + accessToken).then(res => res.json())
      .then(data => setLikedSongs(data.items))
    console.log(songs)

  }, []);
  return (
    <div className="App">
      <h2> Liked Songs </h2>
      <Navbar
      // likedSongs={songs}
      // topSongs={topSongs}
      // yearSongs={yearSongs}
      // monthSongs={monthSongs}
      // accessToken={accessToken}
      />
      {songs &&
        songs.map((val, key) => {
          return <p>{val.track.name} by {val.track.artists[0].name}</p>
        })
      }
    </div>
  );
}

export default LikedSongs;