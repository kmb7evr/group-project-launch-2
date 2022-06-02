import { useState } from 'react';
import DiscoverPage from "./discoverPage";
import LoginPage from "./loginPage";

function SpotifyApp() {
  const [username, setUsername] = useState();
  const [accessToken, setAccessToken] = useState();
  if (accessToken) {
    fetch("http://localhost:9000/users/usernameget?token=" + accessToken).then(res => res.json())
      .then(data => setUsername(data.display_name))
    // .then(data => setSongs(data.items))
  }

  return (
    <div className="App">
      {accessToken ? <DiscoverPage user={username} logout={() => setUsername(null)} accessToken={accessToken} /> : <LoginPage setAccessToken={setAccessToken} setUsername={setUsername} />}
    </div>
  );
}

export default SpotifyApp;