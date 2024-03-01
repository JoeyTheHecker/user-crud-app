import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  notification: null,
  setNotification: () => {},
})

export const ContextProvider = ({children}) => {
  const [notification, setNotification] = useState({
    open: false,
    message: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({
      open: false,
    });
  };

  return (
    <StateContext.Provider value={{
      notification,
      setNotification,
      handleClose
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
