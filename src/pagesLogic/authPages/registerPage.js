import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import AuthService from "@/services/AuthService";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { loginUser } from "@/reduxStore/slices/auth";

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
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [refferredBy, setrefferredBy] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setloading(true);
    const data = {
      email,
      username,
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

  const disabled =
    !email.trim() ||
    !username.trim() ||
    !password.trim() ||
    confpassword.trim() !== password.trim();

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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confpassword}
            onChange={(e) => setconfPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Reffered By"
            value={refferredBy}
            onChange={(e) => setrefferredBy(e.target.value)}
            helperText="Insert the username of your refferal."
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || disabled}
            loading={loading}
          >
            Sign In
          </LoadingButton>
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
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";

// import AuthService from "@/services/AuthService";
// import { showSuccessToast, showErrorToast } from "@/utils/toaster";
// import { loginUser } from "@/reduxStore/slices/auth";

// export default function LoginPage() {
//   // GET UPDATES FROM REDUX STORE
//   const authSlice = useSelector((state) => state.auth);
//   const router = useRouter();
//   useEffect(() => {
//     //  LISTEN TO TO STORE, ANYTIME A TOKEN IS DETECTED FORCE USER TO GO TO AN AUTHENTICATED PAGE
//     if (authSlice?.token) router.push("/user/dashboard");
//   }, [authSlice?.token]);

//   const dispatch = useDispatch();

//   const [loading, setloading] = useState(false);
//   const [email, setemail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setloading(true);
//     const data = {
//       email,
//       password,
//     };

//     try {
//       const response = await AuthService.login(data);

//       // PUSH UPDATES TO REDUX STORE
//       dispatch(
//         loginUser({
//           token: response?.data?.token,
//           user: response?.data?.user,
//         })
//       );

//       // SHOW SUCCESS MESSGAE
//       showSuccessToast(response?.data?.msg || "Success");
//     } catch (error) {
//       // SHOW ERROR MESSGAE
//       showErrorToast(error?.response?.data?.error || "An error occured!");
//     } finally {
//       setloading(false);
//     }
//   };

//   return (
//     <div>
//       <Head>
//         <title>Login</title>
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
//                 Sign in to your account
//               </h1>
//               <form className="space-y-4 md:space-y-6" action="#">
//                 <div>
//                   <label
//                     for="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email or username
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required=""
//                     value={email}
//                     onChange={(e) => setemail(e.target.value)}
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
//
//                     placeholder=""
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required=""
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         aria-describedby="remember"
//                         type="checkbox"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                         required=""
//                       />
//                     </div>
//                     <div className="ml-3 text-sm">
//                       <label
//                         for="remember"
//                         className="text-gray-500 dark:text-gray-300"
//                       >
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                   <a
//                     href="#"
//                     className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>

//                 <button
//                   onClick={handleLogin}
//                   type="submit"
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   {loading ? "Loading please wait" : "Log in"}
//                 </button>
//                 <a
//                   href="/user/register"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                     Don’t have an account yet? Register
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
