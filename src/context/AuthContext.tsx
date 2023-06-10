import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Box, CircularProgress } from "@mui/material";
const auth = getAuth();

interface AuthContextValue {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>; // Include getToken function
}

const UserContext = createContext({} as AuthContextValue);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signOutUser = () => {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; path=/;`;
    return signOut(auth);
  };

  const getToken = useCallback(async () => {
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  }, [user]);

  const setSecureCookie = (
    name: string,
    value: string,
    daysToExpire: number
  ) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${name}=${value}${expires}; secure; path=/`;
  };

  useEffect(() => {
    const setTokenToCookie = async () => {
      const token = await getToken();
      if (token) {
        setSecureCookie("accessToken", token, 7);
      }
    };

    setTokenToCookie();
  }, [user, getToken]);

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: "#0a3b47" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
        user,
        loading,
        getToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
