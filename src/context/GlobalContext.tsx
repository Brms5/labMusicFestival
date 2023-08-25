import { GlobalContextData } from "@ui/types/context";
import { LoggedUser } from "@ui/types/user";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalProvider = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState<LoggedUser | null>(null);

  const contextValue = useMemo(
    () => ({ userLogged, setUserLogged }),
    [userLogged, setUserLogged]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
