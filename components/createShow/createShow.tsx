import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CreateShowBody } from "@ui/types/show";
import { BandResponse } from "@ui/types/band";

interface CreateShowProps {
  bands: BandResponse[];
  userAdmin: boolean;
}

const timeOptions = [
  { value: "", label: "None" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 22, label: "22" },
  { value: 24, label: "24" },
];

const dayOptions = [
  { value: "", label: "None" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

function CreateShow({ bands, userAdmin }: CreateShowProps) {
  const [showBody, setShowBody] = React.useState<CreateShowBody>({
    day: "",
    startTime: "",
    endTime: "",
    band: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    // Use the name attribute to identify which property to update
    setShowBody({
      ...showBody,
      [name]: value,
    });
  };

  const bandOptions = bands.map((band) => ({
    value: band.id,
    label: band.name,
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "250px",
        height: "400px",
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
      <Typography variant="h5" color="text.secondary">
        Create a show
      </Typography>
      <FormControl variant="standard" sx={{ minWidth: 160 }}>
        <InputLabel>Day</InputLabel>
        <Select
          value={showBody.day}
          onChange={handleChange}
          name="day"
          type="text"
        >
          {dayOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 160 }}>
        <InputLabel>Start</InputLabel>
        <Select
          value={showBody.startTime}
          onChange={handleChange}
          name="startTime"
          type="text"
        >
          {timeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 160 }}>
        <InputLabel>End</InputLabel>
        <Select
          value={showBody.endTime}
          onChange={handleChange}
          name="endTime"
          type="text"
        >
          {timeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 160 }}>
        <InputLabel>Band</InputLabel>
        <Select
          value={showBody.band}
          onChange={handleChange}
          name="band"
          type="text"
        >
          {bandOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{
          marginTop: "20px",
          color: "#E75099",
          borderBlockColor: "#E75099",
        }}
        variant="outlined"
        disabled={!userAdmin}
      >
        CREATE
      </Button>
    </div>
  );
}

export default CreateShow;
