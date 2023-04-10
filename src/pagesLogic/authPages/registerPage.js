import * as React from "react";
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
import AuthService from "@/services/AuthService";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { Register } from "@/reduxStore/slices/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import register from "pages/user/register";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/reduxStore/slices/auth";

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

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authSlice = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (authSlice?.token) router.push("/user/dashboard");
  }, [authSlice?.token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // setloading(true);
    const data = {
      username,
      email,
      password,
    };
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    try {
      const response = await AuthService.register(data);
      // dispatch to input to redux store
      dispatch(registerUser(response.data));
      localStorage.setItem("token", response.data.token);
      router.push("/user/dashboard");

      // SHOW SUCCESS MESSGAE
      showSuccessToast(response?.data?.msg || "Success");
    } catch (error) {
      // show error
      showErrorToast(error?.response?.data?.error || "An error occured!");
    } finally {
      // setloading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// import React, { useState } from "react";
// import Head from "next/head";
// import { useDispatch } from "react-redux";

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   // const { user, isLoading, error } = useSelector((state) => state.auth);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // useEffect(() => {
//   //   // You might want to dispatch an action here to check if the user is already logged in
//   //   // and fetch their details from the API if necessary
//   // }, []);

//   const handleRegister = () => {};

//   return (
//     <div>
//       <Head>
//         <title>Register</title>
//       </Head>
//       <section className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <img
//             src="/_html_files/images/logo/logo-white1.svg"
//             alt="logo"
//             style={{ maxWidth: 200, margin: 20 }}
//           />

//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Create a new account
//               </h1>
//               <form className="space-y-4 md:space-y-6" action="#">
//                 <div>
//                   <label
//                     for="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your Username
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required=""
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     for="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required=""
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     for="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="••••••••"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required=""
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <button
//                   // type="submit"
//                   onClick={handleRegister}
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Create a new Account
//                 </button>
//                 <a
//                   href="/user/login"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                     Already have an account? Login
//                   </p>
//                 </a>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
