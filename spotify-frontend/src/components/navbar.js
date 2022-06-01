import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
      <div className="App">
        <Link to="/">Home</Link> |{" "}
        <Link to="/Forum">Forum</Link> |{" "}
        <Link to="/LikedSongs">Liked Songs</Link> |{" "}
        <Link to="/TopSongs">Top Songs</Link> |{" "}
        <Link to="/TopArtists">Top Artists</Link> |{" "}
        <Link to="/Inbox">Inbox</Link> |{" "}
        <Link to="/UserProfile">User Profile</Link> {" "}
    </div>
    );
  }
  
  export default Navbar;