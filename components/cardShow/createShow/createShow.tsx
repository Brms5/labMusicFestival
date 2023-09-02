import {
  Typography,
  FormControl,
  InputLabel,
  Tooltip,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { showService } from "@ui/services/show";
import { BandResponse } from "@ui/types/band";
import { CreateShowBody } from "@ui/types/show";
import { MessageInfo, NumberShowsByDate } from "pages/users/[userid]";
import React from "react";
import { hasEmptyProperties } from "src/utils/utils";

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
    <>
      <Typography variant="h5" color="text.secondary">
        Create a show
      </Typography>
      <FormControl variant="standard" sx={{ width: 200 }}>
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
      <FormControl variant="standard" sx={{ width: 200 }}>
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
      <FormControl variant="standard" sx={{ width: 200 }}>
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
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Band</InputLabel>
        <Tooltip title="Bands without show" placement="top">
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
        </Tooltip>
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
    </>
  );
}

export default CreateShow;
