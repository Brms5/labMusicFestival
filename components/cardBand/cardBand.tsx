import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { MessageInfo } from "pages/users/[userid]";
import CreateBand from "./createBand/createBand";
import { BandResponse } from "@ui/types/band";
import DeleteBand from "./deleteBand/deleteBand";

interface CardBandProps {
  bands: BandResponse[];
  userAdmin: boolean | undefined;
  setNewBand: (newBand: boolean) => void;
  newBand: boolean;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
}

function CardBand({
  bands,
  userAdmin,
  setNewBand,
  newBand,
  setOpenAlert,
  setMessageInfo,
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
        border: "3px solid green",
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
          color: "#0E8B3B",
          textDecoration: "none",
        }}
      >
        Band
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
          setNewBand={setNewBand}
          newBand={newBand}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
        />
      ) : alignment === "Update" ? (
        <div>Update</div>
      ) : (
        <DeleteBand
          bands={bands}
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
        />
      )}
    </div>
  );
}

export default CardBand;
