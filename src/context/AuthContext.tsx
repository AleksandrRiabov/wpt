import {
  ReactNode,
  createContext,
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
    return signOut(auth);
  };

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
