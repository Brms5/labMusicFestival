export interface GlobalContextProps {
  children: React.ReactNode;
}

export interface GlobalContextData {
  userLogged: string | null;
  setUserLogged: (loggedUser: string | null) => void;
}
