import { LoggedUser } from "./user";

export interface GlobalContextProps {
  children: React.ReactNode;
}

export interface GlobalContextData {
  loggedUser: LoggedUser;
  setLoggedUser: (loggedUser: LoggedUser) => void;
}
