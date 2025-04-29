'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const useSharedState = () => useContext(StateContext);

const StateProvider = ({ children }) => {
  const [toggleList, setToggleList] = useState(false);
  const [toggleInput, setToggleInput] = useState(false)

  useEffect(() => {
    if (toggleList) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [toggleList]);

  return (
    <StateContext.Provider value={{ toggleList, setToggleList, toggleInput, setToggleInput }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
