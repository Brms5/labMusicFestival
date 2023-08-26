import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { CreateBand } from "@server/types/band";

interface CreateBandProps {
  userAdmin: boolean;
}

function CreateBand({ userAdmin }: CreateBandProps) {
  const [bandBody, setBandBody] = React.useState<CreateBand>({
    name: "",
    music_genre: "",
    responsible: "",
    band_image: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Use the name attribute to identify which property to update
    setBandBody({
      ...bandBody,
      [name]: value,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "250px",
        height: "400px",
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
      <Typography variant="h5" color="text.secondary">
        Create a band
      </Typography>
      <TextField
        id="standard-basic"
        name="name"
        value={bandBody.name}
        onChange={handleChange}
        label="Name"
        variant="standard"
      />
      <TextField
        id="standard-basic"
        name="music_genre"
        value={bandBody.music_genre}
        onChange={handleChange}
        label="Genre"
        variant="standard"
      />
      <TextField
        id="standard-basic"
        name="responsible"
        value={bandBody.responsible}
        onChange={handleChange}
        label="Singer"
        variant="standard"
      />
      <TextField
        id="standard-basic"
        name="band_image"
        value={bandBody.band_image}
        onChange={handleChange}
        label="Image"
        variant="standard"
      />
      <Button
        sx={{
          marginTop: "20px",
          color: "#0E8B3B",
          borderBlockColor: "#0E8B3B",
        }}
        variant="outlined"
        disabled={!userAdmin}
      >
        Create
      </Button>
    </div>
  );
}

export default CreateBand;
