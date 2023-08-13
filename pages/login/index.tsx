import React, { useState, useContext } from "react";
import { Form } from "./style";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { userService } from "@ui/services/user";
import { UserLogin } from "@server/types/user";
import { GlobalContext } from "src/context/GlobalContext";

function Login() {
  const { setLoggedUser } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

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
        setLoggedUser(response);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form>
        <TextField
          id="outlined-basic"
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
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
            label="Senha"
            placeholder="Mínimo 6 caracteres"
          />
        </FormControl>
        <Button
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
        >
          Entrar
        </Button>
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
