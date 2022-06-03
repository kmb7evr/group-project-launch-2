import { useState, useContext } from 'react';
import DiscoverPage from "./discoverPage";
import LoginPage from "./loginPage";
import { AccessTokenContext } from "../Contexts/accessTokenContext";


function SpotifyApp() {
  const { accessToken } = useContext(AccessTokenContext);
  const [username, setUsername] = useState();

  if (accessToken) {
    fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
      .then(data => setUsername(data.display_name))
  }

  return (
    <div className="App">
      {accessToken ? <DiscoverPage
      /> : <LoginPage
      />}
    </div>
  );
}

export default SpotifyApp;