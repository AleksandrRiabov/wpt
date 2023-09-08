import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import LoginWithGoogle from "./LoginWithGoogle";
import { UserAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../../../components/Notifications/Notifications";
import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import FlexBetween from "../../../components/FlexBetween/FlexBetween";
import useSendAnalytics from "../../../hooks/useSendAnalytics";
import "../style.css";
import { tokens } from "../../../theme";

const notice =
  "Because of free hosting, initial loading may take a while. Thank you for your patience.";

const Login = () => {
  useSendAnalytics({ title: "Login Page" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const navigate = useNavigate();

  const { signInUser, user } = UserAuth();
  // Get theme and colors from MUI theme
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  useEffect(() => {
    if (user) {
      alert(notice);
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim().length) {
      return setInvalidEmail("Please enter your email");
    } else {
      setInvalidEmail("");
    }
    if (!password.trim().length) {
      return setInvalidPassword("Please enter your password");
    } else {
      setInvalidPassword("");
    }

    try {
      await signInUser(email, password);
      setSuccessMessage(`Successfully ${user?.displayName} Signed in`);
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

  const handleGuestModelogin = async () => {
    try {
      await signInUser("visitor@wpt.com", "1234567Wpt");
      setSuccessMessage(`Successfully ${user?.displayName} Signed in`);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Box
      className=" mainBackgroundImg"
      sx={{
        width: "100%",
        display: "flex",
        marginBottom: "-30px",
        overflow: "hidden",
      }}
    >
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="85vh"
        >
          <DashboardBox
            className="forklift"
            sx={{
              padding: { xs: "15px", md: "40px", maxWidth: "400px" },
              margin: "20px 0",
              position: "relative",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" textAlign={"center"} p="10px 0 25px">
                Login
              </Typography>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                color="secondary"
                sx={{
                  margin: "10px 0",
                }}
                error={invalidEmail.length > 0}
                helperText={invalidEmail}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                color="secondary"
                error={invalidPassword.length > 0}
                helperText={invalidPassword}
              />
              <FlexBetween p="30px 0">
                <Button type="submit" variant="contained" color="secondary">
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: colors.secondary[400],
                    background: colors.lightBlue[600],
                    "&:hover": {
                      background: colors.lightBlue[700],
                    },
                  }}
                  onClick={handleGuestModelogin}
                >
                  Guest Mode
                </Button>
              </FlexBetween>
            </form>
            <LoginWithGoogle />

            <Box pt="30px">
              <Typography
                variant="h5"
                sx={{ color: "#fff" }}
                textAlign="center"
                pb="10px"
              >
                Don't have an account?
              </Typography>
              <Link to="/signup">
                <Typography variant="h4" color="secondary" textAlign="center">
                  SIGN UP
                </Typography>
              </Link>
            </Box>
            <Notifications
              errorMessage={errorMessage}
              successMessage={successMessage}
              handleCloseSnackbar={handleCloseSnackbar}
            />
          </DashboardBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
