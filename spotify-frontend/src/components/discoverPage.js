import { Button, Typography, Box } from '@mui/material';
import Navbar from "./navbar";

function DiscoverPage(props) {
    const {user, logout} = props;

  return (
    <div className="App">
        <h3> Welcome to this Discover Page! </h3>
        <h5> {"Currently logged in as: " + user} </h5>
        <Navbar />
        <Button onClick={logout} variant='contained'>Log Out</Button>
    </div>
  );
}

export default DiscoverPage;