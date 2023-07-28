import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import AuthService from "@/services/AuthService";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { loginUser } from "@/reduxStore/slices/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  // GET UPDATES FROM REDUX STORE
  const authSlice = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    //  LISTEN TO TO STORE, ANYTIME A TOKEN IS DETECTED FORCE USER TO GO TO AN AUTHENTICATED PAGE
    if (authSlice?.token) router.push("/user/dashboard");
  }, [authSlice?.token]);

  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    const data = {
      emailOrUserName,
      password,
    };

    try {
      const response = await AuthService.login(data);

      // PUSH UPDATES TO REDUX STORE
      dispatch(
        loginUser({
          token: response?.data?.token,
          user: response?.data?.user,
        })
      );

      // SHOW SUCCESS MESSGAE
      showSuccessToast(response?.data?.msg || "Success");
    } catch (error) {
      // SHOW ERROR MESSGAE
      showErrorToast(error?.response?.data?.error || "An error occured!");
    } finally {
      setloading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailOrUserName"
            label="Email Address or Username"
            name="emailOrUserName"
            autoComplete="emailOrUserName"
            value={emailOrUserName}
            onChange={(e) => setEmailOrUserName(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/register" variant="body2">
                {"Don't have an account? Register "}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
