import { useState } from 'react';
import DiscoverPage from "./DiscoverPage";
import LoginPage from "./loginPage";

function SpotifyApp() {
  const [username, setUsername] = useState();
  return (
    <div className="App">
      {username ? <DiscoverPage user={username} logout={() => setUsername(null)} /> : <LoginPage setUsername={setUsername} />}
    </div>
  );
}

export default SpotifyApp;