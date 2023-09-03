import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CreateShow from "./createShow/createShow";
import { BandResponse } from "@ui/types/band";
import { MessageInfo, NumberShowsByDate } from "pages/users/[userid]";
import DeleteShow from "./deleteShow/deleteShow";
import UpdateShow from "./updateShow/updateShow";

interface CardShowProps {
  bands: BandResponse[];
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
  numberShowsByDate: NumberShowsByDate;
  setNewBand: (newBand: boolean) => void;
  newBand: boolean;
}

function CardShow({
  bands,
  userAdmin,
  setOpenAlert,
  setMessageInfo,
  numberShowsByDate,
  setNewBand,
  newBand,
}: CardShowProps) {
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
        <CreateShow
          bands={bands}
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          numberShowsByDate={numberShowsByDate}
          setNewBand={setNewBand}
          newBand={newBand}
        />
      ) : alignment === "Update" ? (
        <UpdateShow
          bands={bands}
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          numberShowsByDate={numberShowsByDate}
          setNewBand={setNewBand}
          newBand={newBand}
        />
      ) : (
        <DeleteShow
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
        />
      )}
    </div>
  );
}

export default CardShow;
