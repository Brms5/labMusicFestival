import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { BandResponse } from "@ui/types/band";
import { MessageInfo, NumberShowsByDate } from "pages/users/[userid]";
import CreateBand from "./createBand/createBand";

interface CardBandProps {
  bands: BandResponse[];
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
  numberShowsByDate: NumberShowsByDate;
  setNewBand: (newBand: boolean) => void;
  newBand: boolean;
}

function CardBand({
  userAdmin,
  setOpenAlert,
  setMessageInfo,
  setNewBand,
  newBand,
}: CardBandProps) {
  const [alignment, setAlignment] = React.useState("Create");

  const handleFunctions = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "280px",
        height: "450px",
        border: "3px solid #E75099",
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
          color: "#E75099",
          textDecoration: "none",
        }}
      >
        Show
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleFunctions}
        aria-label="Platform"
        sx={{ marginBottom: "10px" }}
      >
        <ToggleButton value="Create">Create</ToggleButton>
        <ToggleButton value="Update">Update</ToggleButton>
        <ToggleButton value="Delete">Delete</ToggleButton>
      </ToggleButtonGroup>
      {alignment === "Create" ? (
        <CreateBand
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          setNewBand={setNewBand}
          newBand={newBand}
        />
      ) : alignment === "Update" ? (
        <div>Update</div>
      ) : (
        <div>Delete</div>
      )}
    </div>
  );
}

export default CardBand;
