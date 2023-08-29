import { GlobalContextData } from "@ui/types/context";
import { LoggedUser } from "@ui/types/user";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalProvider = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState<LoggedUser | null>(null);
  const [userAdmin, setUserAdmin] = useState<boolean | undefined>(undefined);

  const contextValue = useMemo(
    () => ({ userLogged, setUserLogged, userAdmin, setUserAdmin }),
    [userLogged, setUserLogged, userAdmin, setUserAdmin]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
