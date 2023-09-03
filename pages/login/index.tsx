import React, { useState } from "react";
import { Form } from "./style";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { userService } from "@ui/services/user";
import { UserLogin } from "@server/types/user";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { GlobalContext } from "src/context/GlobalContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const { setUserLogged } = React.useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const disableButtonLogin = () => {
    return (
      userEmail.length < 1 ||
      userPassword.length < 1 ||
      validateEmail() ||
      validatePassword()
    );
  };

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const validateEmail = () => {
    if (userEmail.match(pattern)) {
      return false;
    } else if (userEmail.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    if (userPassword.length < 1 || userPassword.length >= 6) {
      return false;
    } else {
      return true;
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const router = useRouter();

  const handleClickSubmit = async () => {
    const userLogin: UserLogin = {
      email: userEmail,
      password: userPassword,
    };
    userService
      .login(userLogin)
      .then((response) => {
        setUserLogged(response);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setOpenAlert(true);
      });
  };

  return (
    <>
      <Form>
        <TextField
          id="login-email"
          label="E-mail"
          placeholder="email@email.com"
          variant="outlined"
          required
          margin="dense"
          fullWidth
          value={userEmail}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserEmail(event.target.value);
          }}
          error={validateEmail()}
        />
        <FormControl variant="outlined" fullWidth required margin="dense">
          <InputLabel htmlFor="login-password">Senha</InputLabel>
          <OutlinedInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserPassword(event.target.value);
            }}
            error={validatePassword()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            placeholder="Minimum 6 characters"
          />
        </FormControl>
        <Button
          id="login-button"
          variant="contained"
          style={{
            backgroundColor: "#8F80BC",
            color: "black",
            marginTop: "12px",
            textTransform: "none",
            height: "48px",
          }}
          fullWidth
          onClick={() => {
            handleClickSubmit();
          }}
          disabled={disableButtonLogin()}
        >
          Entrar
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Endereço de e-mail ou senha incorretos.
          </Alert>
        </Snackbar>
        <Button
          variant="text"
          style={{
            color: "black",
            marginTop: "12px",
            textTransform: "none",
          }}
          onClick={() => router.push("/register")}
        >
          Não possui cadastro? Clique aqui.
        </Button>
      </Form>
    </>
  );
}

export default Login;
