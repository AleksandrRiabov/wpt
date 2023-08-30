import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import googleImg from "./images/google.svg";

function LoginWithGoogle() {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = UserAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Button variant="contained" onClick={handleGoogleLogin}>
      <img src={googleImg} alt={"google icon"} width="30px" />
      <Typography variant="h4" sx={{ textTransform: "none", padding: "5px" }}>
        Sign In with Google account
      </Typography>
    </Button>
  );
}

export default LoginWithGoogle;
