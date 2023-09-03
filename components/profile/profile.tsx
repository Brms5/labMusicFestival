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
    admin: boolean;
  } | null;
  userAdmin: boolean | undefined;
  setUserAdmin: (userAdmin: boolean | undefined) => void;
}

function Profile({ userLogged, userAdmin, setUserAdmin }: ProfileProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userLogged) return;
    userService.updateUserRole(userLogged.id, event.target.checked);
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
          height: "150px",
          marginBottom: "40px",
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
        <div
          style={{
            display: "flex",
            width: "300px",
            height: "100px",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
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
        </div>
      </CardContent>
    </>
  );
}

export default Profile;
