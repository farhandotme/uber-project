import { createContext, useState } from 'react';

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const CaptainContextData = createContext();

// Create the provider component
// eslint-disable-next-line react/prop-types
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: ""
    },
    email: "",
    plate: "",
    color: "",
    model: ""
  });

  return (
    <CaptainContextData.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContextData.Provider>
  );
};

export default CaptainContext;