import * as React from "react";
import "./Login.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField, Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import { red } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
        navigate("/home/");
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
    <Box className="Login">
      <Box className="Login__Form">
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
    </Box>
  );
}
