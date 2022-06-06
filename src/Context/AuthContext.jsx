import { createContext, useContext, useState } from "react";

const AuthConext = createContext();

export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  return (
    <AuthConext.Provider value={{ token, setToken, login, setLogin }}>
      {children}
    </AuthConext.Provider>
  );
}

export const useAuth = () => useContext(AuthConext);
