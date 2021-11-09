import { useContext, useState, useEffect, createContext } from "react";
import firebase from "./index";
import { clearAuthCookie, setAuthCookie } from "./helpers";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setLoadingUser] = useState(true);

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        setUser(null);
        clearAuthCookie();
      } else {
        const tokenResult = await userAuth.getIdTokenResult();
        const { token, claims } = tokenResult;
        setUser(claims);
        setAuthCookie(token);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoadingUser,
    setUser,
    login,
    logout,
  };
}
