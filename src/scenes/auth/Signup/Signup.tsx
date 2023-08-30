import { useEffect, useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { UserAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import FlexBetween from "../../../components/FlexBetween/FlexBetween";
import { HowToReg } from "@mui/icons-material";
import Notifications from "../../../components/Notifications/Notifications";
import useSendAnalytics from "../../../hooks/useSendAnalytics";

import "../style.css";

const Signup = () => {
  useSendAnalytics({ title: "Sign Up Page" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const { createUser, user } = UserAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setErrorMessage("");

    try {
      await createUser(email, password);
      if (user) setSuccessMessage(`Welcome ${user.displayName}`);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else if (name === "password") {
      setPassword(value);
      validatePassword(value);
      validateConfirmPassword(confirmPassword, value);
    } else {
      setConfirmPassword(value);
      validateConfirmPassword(value, password);
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailPattern.test(email)) {
      setInvalidEmail("");
    } else {
      setInvalidEmail("Please enter valid email!");
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      setInvalidPassword("Password too short!");
    } else {
      setInvalidPassword("");
    }
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (confirmPassword.length) {
      if (password !== confirmPassword) {
        setInvalidConfirmPassword("Should be the same as Password!");
      } else {
        setInvalidConfirmPassword("");
      }
    }
  };

  const validateForm = () => {
    if (!email.length) {
      setInvalidEmail("Please enter your Email");
      return false;
    }
    if (!password) {
      setInvalidPassword("Please insert your Password");
      return false;
    }
    if (!confirmPassword) {
      setInvalidConfirmPassword("Please confirm your password");
      return false;
    }

    return !(
      invalidEmail.length ||
      invalidPassword.length ||
      invalidConfirmPassword
    );
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
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
            }}
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" textAlign={"center"} p="10px 0 25px">
                Sign Up
              </Typography>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
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
                name="password"
                onChange={handleChange}
                fullWidth
                color="secondary"
                sx={{
                  margin: "10px 0",
                }}
                error={invalidPassword.length > 0}
                helperText={invalidPassword}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                fullWidth
                color="secondary"
                error={invalidConfirmPassword.length > 0}
                helperText={invalidConfirmPassword}
              />
              <FlexBetween p="30px 0">
                <Button type="submit" variant="contained" color="secondary">
                  <HowToReg /> Register
                </Button>
              </FlexBetween>
            </form>
            <Box pt="30px">
              <Typography
                variant="h5"
                sx={{ color: "#fff" }}
                textAlign="center"
                pb="10px"
              >
                Already have an account?
              </Typography>
              <Link to="/login">
                <Typography variant="h4" color="secondary" textAlign="center">
                  SIGN IN
                </Typography>
              </Link>
            </Box>
          </DashboardBox>
        </Box>
        <Notifications
          errorMessage={errorMessage}
          successMessage={successMessage}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      </Container>
    </Box>
  );
};

export default Signup;
