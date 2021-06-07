import React, { createContext, useState } from "react";

const Context = createContext({
  data: [],
  addData: () => {},
});

export function ContextProvider(props) {
  const [userData, setUserData] = useState([]);

  function addData(data) {
    setUserData((prevData) => {
      return prevData.concat(data);
    });
  }

  const context = {
    data: userData,
    addData: addData,
  };
  console.log(userData);

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}
export default Context;
