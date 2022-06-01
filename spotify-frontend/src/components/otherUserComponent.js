import Navbar from "./navbar";
import { useLocation } from 'react-router-dom'

function OtherUserComponent() {

  const location = useLocation();
const { user } = location.state;
    return (
      <div className="App">
          <h2> {user.username}'s Profile </h2>
          <Navbar />
          <table>
          <tr>
            <td>Username: </td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>First name: </td>
            <td>blah blah blah</td>
          </tr>
          <tr>
            <td>Last name: </td>
            <td>blah blah blah</td>
          </tr>
          {/* {<tr>
            <td>Make private: </td>
            <td><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/></td>
          </tr>} */}
          </table>
          <button type="button">Save Changes</button>
      </div>
    );
  }
  
  export default OtherUserComponent;