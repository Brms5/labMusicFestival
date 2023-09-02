import React, { useEffect } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
  TextField,
} from "@mui/material";
import { MessageInfo } from "pages/users/[userid]";
import { BandBody } from "@ui/types/band";
import { bandService } from "@ui/services/band";
import { hasEmptyProperties } from "src/utils/utils";

interface UpdateBandProps {
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
}

function UpdateBand({
  userAdmin,
  setOpenAlert,
  setMessageInfo,
}: UpdateBandProps) {
  const [allBands, setAllBands] = React.useState<BandBody[]>([]);
  const [bandBody, setBandBody] = React.useState<BandBody>({
    name: "",
    music_genre: "",
    responsible: "",
    band_image: "",
  });

  useEffect(() => {
    bandService.getBands().then((bands) => {
      setAllBands(bands);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setBandBody({
      ...bandBody,
      [name]: value,
    });
  };

  const disableButton: boolean = !userAdmin || hasEmptyProperties(bandBody);

  const onClick = async (bandBody: BandBody) => {
    await bandService.updateBand(bandBody as BandBody);
    setBandBody({
      name: "",
      music_genre: "",
      responsible: "",
      band_image: "",
    });
    setOpenAlert(true);
    setMessageInfo({
      message: "Band updated successfully!",
      severity: "success",
    });
  };

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Update a band
      </Typography>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Name</InputLabel>
        <Select
          value={bandBody.name}
          onChange={handleChange}
          name="name"
          type="text"
        >
          {allBands.length > 0 ? (
            allBands.map((band, index) => (
              <MenuItem key={index} value={band.name}>
                {band.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
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
        Update
      </Button>
    </>
  );
}

export default UpdateBand;
