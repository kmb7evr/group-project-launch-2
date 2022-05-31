import { Button, Typography, Box } from '@mui/material'

function DiscoverPage(props) {
    const {user, logout} = props;

  return (
    <div className="App">
        <h3> Welcome to this Discover Page! </h3>
        <Button onClick={logout} variant='contained'>Log Out</Button>
    </div>
  );
}

export default DiscoverPage;