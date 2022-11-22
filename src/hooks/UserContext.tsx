import { createContext, useState, useEffect } from "react";
import react from "react";

import { getItem } from "../utils/localStorage";
import persistUser from "./persistUser";

const context = createContext({
  contextData: undefined,
  setContext: undefined,
});

export function Provider(props) {
  const [contextData, setContext] = useState({
    url: process.env.REACT_APP_URL
  });

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      persistUser(token, contextData, setContext);
    }
  }, []);

  return (
    <context.Provider
      value={{
        contextData,
        setContext,
      }}
    >
      {props.children}
    </context.Provider>
  );
}
export const getContext = () => react.useContext(context);
