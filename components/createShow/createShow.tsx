import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CreateShowBody } from "@ui/types/show";
import { BandResponse } from "@ui/types/band";
import { showService } from "@ui/services/show";
import { MessageInfo, NumberShowsByDate } from "pages/users/[userid]";

interface CreateShowProps {
  bands: BandResponse[];
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
  numberShowsByDate: NumberShowsByDate;
  setNewBand: (newBand: boolean) => void;
  newBand: boolean;
}

const timeOptions = [
  { value: "", label: "None" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" },
  { value: 24, label: "24" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasEmptyProperties(obj: any): boolean {
  return Object.values(obj).some((value) => {
    return value === "";
  });
}

function CreateShow({
  bands,
  userAdmin,
  setOpenAlert,
  setMessageInfo,
  numberShowsByDate,
  setNewBand,
  newBand,
}: CreateShowProps) {
  const [showBody, setShowBody] = React.useState<CreateShowBody>({
    day: "",
    startTime: "",
    endTime: "",
    band: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    if (name === "startTime") {
      setShowBody({
        ...showBody,
        startTime: value,
        endTime: "", // Set endTime to an empty string here
      });
    } else {
      // Use the name attribute to identify which property to update
      setShowBody({
        ...showBody,
        [name]: value,
      });
    }
  };

  const dayOptions = [
    { value: "", label: "None", show: true },
    { value: "Monday", label: "Monday", show: numberShowsByDate.Monday < 3 },
    { value: "Tuesday", label: "Tuesday", show: numberShowsByDate.Tuesday < 3 },
    {
      value: "Wednesday",
      label: "Wednesday",
      show: numberShowsByDate.Wednesday < 3,
    },
    {
      value: "Thursday",
      label: "Thursday",
      show: numberShowsByDate.Thursday < 3,
    },
    { value: "Friday", label: "Friday", show: numberShowsByDate.Friday < 3 },
    {
      value: "Saturday",
      label: "Saturday",
      show: numberShowsByDate.Saturday < 3,
    },
    { value: "Sunday", label: "Sunday", show: numberShowsByDate.Sunday < 3 },
  ];

  const bandOptions = bands.map((band) => ({
    value: band.id,
    label: band.name,
  }));

  const disableButton: boolean = !userAdmin || hasEmptyProperties(showBody);

  const onClick = async (showBody: CreateShowBody) => {
    await showService.createShow(showBody);
    setShowBody({
      day: "",
      startTime: "",
      endTime: "",
      band: "",
    });
    setOpenAlert(true);
    setNewBand(!newBand);
    setMessageInfo({
      message: "Show created successfully!",
      severity: "success",
    });
  };

  const timeEndOptions = timeOptions.filter(
    (option) =>
      (option.value > showBody.startTime &&
        option.value <= showBody.startTime + 3) ||
      option.value === ""
  );

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
        <Tooltip title="3 shows a day" placement="top">
          <Select
            value={showBody.day}
            onChange={handleChange}
            name="day"
            type="text"
          >
            {dayOptions.map(
              (option) =>
                option.show && (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )
            )}
          </Select>
        </Tooltip>
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
          {timeEndOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 160 }}>
        <InputLabel>Band</InputLabel>
        <Select
          value={showBody.band}
          onChange={handleChange}
          name="band"
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
      </FormControl>
      <Button
        sx={{
          marginTop: "20px",
          color: "#E75099",
          borderBlockColor: "#E75099",
        }}
        variant="outlined"
        disabled={disableButton}
        onClick={() => onClick(showBody)}
      >
        CREATE
      </Button>
    </div>
  );
}

export default CreateShow;
