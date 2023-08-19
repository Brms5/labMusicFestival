import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UserBody } from "@server/types/user";
import { Form } from "pages/login/style";
import { userService } from "@ui/services/user";
import { GlobalContext } from "src/context/GlobalContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
  const { setUserLogged } = React.useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userForm, setUserForm] = useState<UserBody>({
    name: "",
    email: "",
    password: "",
    role: "normal",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (e: any) => {
    if (e.target.getAttribute("name") == "formName") {
      setUserForm({
        name: e.target.value,
        email: userForm.email,
        password: userForm.password,
        role: "normal",
      });
    } else if (e.target.getAttribute("name") == "formEmail") {
      setUserForm({
        name: userForm.name,
        email: e.target.value,
        password: userForm.password,
        role: "normal",
      });
    } else if (e.target.getAttribute("name") == "formPassword") {
      setUserForm({
        name: userForm.name,
        email: userForm.email,
        password: e.target.value,
        role: "normal",
      });
    }
  };

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const validateEmail = () => {
    if (userForm.email.match(pattern)) {
      return false;
    } else if (userForm.email.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    if (userForm.password.length < 1 || userForm.password.length >= 6) {
      return false;
    } else {
      return true;
    }
  };

  const disableButtonRegister = () => {
    return (
      userForm.email.length < 1 ||
      userForm.name.length < 1 ||
      userForm.password.length < 1 ||
      confirmPassword != userForm.password ||
      validateEmail() ||
      validatePassword()
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const router = useRouter();
  const handleClickSubmit = async () => {
    if (!validateEmail() && !validatePassword()) {
      userService
        .registerUser(userForm)
        .then((response) => {
          setUserLogged(response.name[0]);
          if (window.localStorage.getItem("token") !== null) {
            router.push("/");
          }
        })
        .catch((error) => {
          setOpenAlert(true);
          setErrorMessage(error.message);
        });
    } else {
      setOpenAlert(true);
      setErrorMessage("Preencha os campos corretamente");
    }
  };

  return (
    <>
      <Form>
        <TextField
          id="outlined-basic-name"
          label="Nome"
          placeholder="Nome"
          variant="outlined"
          required
          margin="dense"
          fullWidth
          name="formName"
          value={userForm.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleFormChange(event);
          }}
        />
        <TextField
          id="outlined-basic-email"
          label="E-mail"
          placeholder="email@email.com"
          variant="outlined"
          required
          margin="dense"
          fullWidth
          name="formEmail"
          value={userForm.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleFormChange(event);
          }}
          error={validateEmail()}
        />
        <FormControl variant="outlined" fullWidth required margin="dense">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
            name="formPassword"
            value={userForm.password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleFormChange(event);
            }}
            error={validatePassword()}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth required margin="dense">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirmar
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirmar"
            placeholder="Mínimo 6 caracteres"
            value={confirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(event.target.value);
            }}
            error={confirmPassword != userForm.password}
          />
          <FormHelperText hidden={confirmPassword == userForm.password}>
            Deve ser a mesma que a anterior.
          </FormHelperText>
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
          disabled={disableButtonRegister()}
        >
          Criar
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Form>
    </>
  );
}

export default Register;
