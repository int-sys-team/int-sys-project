// UserProvider.js
import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

function getInitialState() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
