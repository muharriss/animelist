'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const useSharedState = () => useContext(StateContext);

const StateProvider = ({ children }) => {
  const [toggleList, setToggleList] = useState(false);
  const [toggleInput, setToggleInput] = useState(false)
  const [toggleSelectSearch, setToggleSelectSearch] = useState(false)

  useEffect(() => {
    if (toggleList || toggleInput) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [toggleList, toggleInput]);

  return (
    <StateContext.Provider value={{ toggleList, setToggleList, toggleInput, setToggleInput, toggleSelectSearch, setToggleSelectSearch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
