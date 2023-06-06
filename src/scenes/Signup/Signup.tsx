import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("false");

  const navigate = useNavigate();

  const { createUser, user } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await createUser(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  console.log(user);
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
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
