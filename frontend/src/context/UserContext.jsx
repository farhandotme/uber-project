import { createContext, useState } from 'react';

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const UserContextData = createContext();

// Create the provider component
// eslint-disable-next-line react/prop-types
const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContextData.Provider value={{ user, setUser }}>
      {children}
    </UserContextData.Provider>
  );
};

export default UserContext;