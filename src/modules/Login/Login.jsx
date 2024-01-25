import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import { red } from "@mui/material/colors";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const defaultTheme = createTheme();

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASEURL,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID,
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default function SignIn(props) {
  const [loginError, setLoginError] = React.useState({});

  let navigate = useNavigate();

  const CustomHelperText = (props) => {
    return (
      <FormHelperText sx={{ color: red[600] }}>
        {props.helperText}
      </FormHelperText>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.setUserDetails(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/wrong-password") {
          setLoginError({
            state: true,
            errorCode: errorCode,
            errorMessage: "Invalid Password!",
          });
        } else if (errorCode === "auth/user-not-found") {
          setLoginError({
            state: true.valueOf,
            errorCode: errorCode,
            errorMessage: "User not found!",
          });
        }
      });
  };

  return (
    <Container className="Login" component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        className="Login"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#8c1c13" }}>
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          />
          {loginError.state ? (
            <CustomHelperText helperText={loginError.errorMessage} />
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "#fefefe",
              backgroundColor: "#bf4342",
              "&:hover": {
                backgroundColor: "#8c1c13",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
