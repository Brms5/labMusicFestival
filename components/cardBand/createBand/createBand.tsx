import React from "react";
import { Button, TextField, Tooltip, Typography } from "@mui/material";
import { bandService } from "@ui/services/band";
import { BandBody } from "@ui/types/band";
import { MessageInfo } from "pages/users/[userid]";

interface CreateBandProps {
  userAdmin: boolean | undefined;
  setNewBand: (newBand: boolean) => void;
  newBand: boolean;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasEmptyProperties(obj: any): boolean {
  return Object.values(obj).some((value) => {
    return value === "";
  });
}

function CreateBand({
  userAdmin,
  setNewBand,
  newBand,
  setOpenAlert,
  setMessageInfo,
}: CreateBandProps) {
  const [bandBody, setBandBody] = React.useState<BandBody>({
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

  const onClick = async (bandBody: BandBody) => {
    const band = await bandService.getBandByName(bandBody.name);
    if (band) {
      setOpenAlert(true);
      setMessageInfo({
        message: "Band already exists!",
        severity: "error",
      });
      return;
    }
    await bandService.createBand(bandBody);
    setBandBody({
      name: "",
      music_genre: "",
      responsible: "",
      band_image: "",
    });
    setNewBand(!newBand);
    setOpenAlert(true);
    setMessageInfo({
      message: "Band created successfully!",
      severity: "success",
    });
  };

  const disableButton: boolean = !userAdmin || hasEmptyProperties(bandBody);

  return (
    <>
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
        sx={{ width: 200 }}
      />
      <TextField
        id="standard-basic"
        name="music_genre"
        value={bandBody.music_genre}
        onChange={handleChange}
        label="Genre"
        variant="standard"
        sx={{ width: 200 }}
      />
      <TextField
        id="standard-basic"
        name="responsible"
        value={bandBody.responsible}
        onChange={handleChange}
        label="Singer"
        variant="standard"
        sx={{ width: 200 }}
      />
      <Tooltip title="Use image address">
        <TextField
          id="standard-basic"
          name="band_image"
          value={bandBody.band_image}
          onChange={handleChange}
          label="Image"
          variant="standard"
          sx={{ width: 200 }}
        />
      </Tooltip>
      <Button
        sx={{
          marginTop: "20px",
          color: "#0E8B3B",
          borderBlockColor: "#0E8B3B",
        }}
        variant="outlined"
        disabled={disableButton}
        onClick={() => onClick(bandBody)}
      >
        Create
      </Button>
    </>
  );
}

export default CreateBand;
