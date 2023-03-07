import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { loginAction } from "../store/modules/loginSlice";

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('"Fill all the fields"');
      return;
    }

    const user = {
      username,
      password,
    };

    const result = await dispatch(loginAction(user)).unwrap();

    if (!result.ok) {
      alert(result.message);
      return;
    }

    navigate("/home");
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
            Login
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
        <Grid container spacing={1} sx={{ marginY: "10px" }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={handleLogin} fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button variant="contained" onClick={() => navigate("/")} fullWidth>
              Create a account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
