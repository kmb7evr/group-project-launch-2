import React, { createContext, useState } from 'react';

const AccessTokenContext = createContext('');

function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');
  const [allUsers, setAllUsers] = useState();
  const [currentUser, setCurrentUser] = useState();

  const obj = {
    accessToken: accessToken,
    setAccessToken: setAccessToken,
    allUsers: allUsers,
    setAllUsers: setAllUsers,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser
  }
  
  return (
    <AccessTokenContext.Provider value={obj}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export default AccessTokenProvider;
export { AccessTokenContext };