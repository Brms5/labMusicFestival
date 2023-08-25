import { LoggedUser } from "./user";

export interface GlobalContextProps {
  children: React.ReactNode;
}

export interface GlobalContextData {
  userLogged: LoggedUser | null;
  setUserLogged: (loggedUser: LoggedUser | null) => void;
}
