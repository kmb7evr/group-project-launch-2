import { useState } from 'react';
import DiscoverPage from "./discoverPage";
import LoginPage from "./loginPage";

function SpotifyApp() {
  const [username, setUsername] = useState();
  const [accessToken, setAccessToken] = useState();

  return (
    <div className="App">
      {username ? <DiscoverPage user={username} logout={() => setUsername(null)} accessToken={accessToken} /> : <LoginPage setAccessToken={setAccessToken} setUsername={setUsername} />}
    </div>
  );
}

export default SpotifyApp;