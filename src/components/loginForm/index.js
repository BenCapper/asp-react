import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  title: {
    textAlign: 'center',
  },
  err: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 2,
    marginBottom: -2
  }
};

const LoginForm = () => {
  const [user, setUser] = useState({});
  const [fbCode, setFbCode] = useState("")
  const navigate = useNavigate();
  const auth = getAuth();
  
  const [values, setValues] = React.useState({
      email: '',
      password: '',
      showPassword: false,
    });

  const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user, values.email, values.password)
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/movies")
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      errorCheck(errorCode)
    });
  };

  const register = () => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(values.email, values.password)
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/movies")
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        errorCheck(errorCode)
      });
    };


  const errorCheck = (errorCode) => {
    if (errorCode === "auth/email-already-in-use"){
      setFbCode("Account Already Exists");
    } 
    if (errorCode === "auth/invalid-email") {
      setFbCode("Invalid Email Address");
    } 
    if (errorCode === "auth/missing-email") {
      setFbCode("Enter an Email Address");
    } 
    if (errorCode === "auth/internal-error") {
      setFbCode("Invalid Password");
    }
  }

  return (
    <>
    <br></br>
    <Box sx={styles.root}>
    <FormControl sx={{ m: 5, mt: 5, mb: 5, width: '25ch' }} variant="outlined">
    <Typography sx={styles.title} color="primary" component="h2" variant="h3">
        Login
      </Typography>
    </FormControl>
    <br/>
    <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
      <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange('email')}
        />
        </FormControl>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        required
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        placeholder="Password"
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color="primary"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
      <Typography sx={styles.err}>
        {fbCode}
      </Typography>
    <FormControl sx={{ m: 1, mt: 5, width: '25ch' }} variant="outlined">
      <Button variant="contained" onClick={register}>Create Account</Button>
    </FormControl>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <Button variant="contained" onClick={login}>Login</Button>
    </FormControl><br></br>
      <br></br>

    </Box>
    </>
  );
};


export default LoginForm;