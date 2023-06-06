import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function LoginWithGoogle() {
  const navigate = useNavigate();
  const { signInWithGoogle } = UserAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleGoogleLogin}>
      Login with Google account
    </Button>
  );
}

export default LoginWithGoogle;
