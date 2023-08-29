import React from "react";
import {
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { userService } from "@ui/services/user";

interface ProfileProps {
  userLogged: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  userAdmin: boolean | undefined;
  setUserAdmin: (userAdmin: boolean | undefined) => void;
}

function Profile({ userLogged, userAdmin, setUserAdmin }: ProfileProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userLogged) return;
    userService.updateUserRole(
      userLogged.id,
      userLogged.role === "admin" ? "user" : "admin"
    );
    setUserAdmin(event.target.checked);
  };

  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "250px",
          height: "200px",
          marginBottom: "20px",
        }}
      >
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "grey",
            textDecoration: "none",
          }}
        >
          Profile
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#009EC9",
            textDecoration: "none",
          }}
        >
          {userLogged?.name}
        </Typography>
        <FormControlLabel
          control={<Switch checked={userAdmin} onChange={handleChange} />}
          label="Admin"
        />
      </CardContent>
    </>
  );
}

export default Profile;
