import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api.service";
export const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Fill all the fields");
      return;
    }

    const user = {
      username,
      password,
      confirmPassword,
    };

    const result = await createUser(user);
    if (result.ok) {
      alert("User create successfully");
      navigate("/login");
      return;
    }
    alert(result.message.toString());
  };

  return (
    <Container sx={{ padding: "20px", width: "450px" }}>
      <Grid
        container
        spacing={3}
        sx={{ backgroundColor: "#fff", borderRadius: "8px", padding: "25px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Create account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            value={username || ""}
            onChange={(ev) => setUsername(ev.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password || ""}
            onChange={(ev) => setPassword(ev.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword || ""}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            fullWidth
          />
        </Grid>
        <Grid container spacing={1} sx={{ marginY: "10px" }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={handleRegister} fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              fullWidth
            >
              I already have a account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
