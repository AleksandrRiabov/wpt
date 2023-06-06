import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import LoginWithGoogle from "./LoginWithGoogle";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notifications from "../../components/Notifications/Notifications";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate();

  const { signInUser, user } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await signInUser(email, password);
      setSuccessMessage(`Successfully ${user?.displayName} Signed in`)
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
      }}
      maxWidth="xs"
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Login
        </Button>
      </form>
      <LoginWithGoogle />
      <Notifications 
      errorMessage={errorMessage}
      successMessage={successMessage}
      handleCloseSnackbar={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Login;
