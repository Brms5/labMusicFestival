import React, { useMemo } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import { hasEmptyProperties } from "src/utils/utils";
import { MessageInfo } from "pages/users/[userid]";
import { BandBody, BandResponse } from "@ui/types/band";
import { bandService } from "@ui/services/band";

interface DeleteBandProps {
  bands: BandResponse[];
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
}

function DeleteBand({
  bands,
  userAdmin,
  setOpenAlert,
  setMessageInfo,
}: DeleteBandProps) {
  const [bandBody, setBandBody] = React.useState<BandBody>({
    name: "",
    music_genre: "",
    responsible: "",
    band_image: "",
    id: "",
  });

  useMemo(() => {
    bands.forEach((band) => {
      if (band.name === bandBody.name) {
        setBandBody({
          ...bandBody,
          music_genre: band.music_genre,
          responsible: band.responsible,
          band_image: band.band_image,
          id: band.id,
        });
      }
    });
  }, [bandBody.name]);

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
    await bandService.deleteBand(bandBody.id as string);
    setBandBody({
      name: "",
      music_genre: "",
      responsible: "",
      band_image: "",
      id: "",
    });
    setOpenAlert(true);
    setMessageInfo({
      message: "Band deleted successfully!",
      severity: "success",
    });
  };

  const bandOptions = bands.map((band) => ({
    value: band.name,
    label: band.name,
  }));

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Delete a band
      </Typography>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Name</InputLabel>
        <Tooltip title="Bands without show" placement="top">
          <Select
            value={bandBody.name}
            onChange={handleChange}
            name="name"
            type="text"
          >
            {bandOptions.length > 0 ? (
              bandOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem key="" value="">
                None
              </MenuItem>
            )}
          </Select>
        </Tooltip>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Genre</InputLabel>
        <Select value={bandBody.music_genre} name="genre" type="text">
          {bandBody && bandBody.music_genre ? (
            <MenuItem value={bandBody.music_genre}>
              {bandBody.music_genre}
            </MenuItem>
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Singer</InputLabel>
        <Select value={bandBody.responsible} name="singer" type="text">
          {bandBody && bandBody.responsible ? (
            <MenuItem value={bandBody.responsible}>
              {bandBody.responsible}
            </MenuItem>
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Image</InputLabel>
        <Select value={bandBody.band_image} name="endTime" type="text">
          {bandBody && bandBody.band_image ? (
            <MenuItem value={bandBody.band_image}>
              {bandBody.band_image}
            </MenuItem>
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
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
        DELETE
      </Button>
    </>
  );
}

export default DeleteBand;
