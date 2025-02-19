import { createContext, useState, useEffect } from 'react';

// Create the context
export const CaptainContextData = createContext();

// Create the provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    const savedCaptain = localStorage.getItem('captain');
    return savedCaptain ? JSON.parse(savedCaptain) : {
      fullname: {
        firstname: "",
        lastname: ""
      },
      email: "",
      plate: "",
      color: "",
      model: ""
    };
  });

  useEffect(() => {
    localStorage.setItem('captain', JSON.stringify(captain));
  }, [captain]);

  return (
    <CaptainContextData.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContextData.Provider>
  );
};

export default CaptainContext;