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
import { bandService } from "@ui/services/band";
import { showService } from "@ui/services/show";
import { BandResponse } from "@ui/types/band";
import { ShowBandBody, ShowSelected } from "@ui/types/show";
import { MessageInfo, NumberShowsByDate } from "pages/users/[userid]";
import React, { useMemo } from "react";
import { hasEmptyProperties } from "src/utils/utils";

interface UpdateShowProps {
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

const weekDays = [
  { value: "", label: "None" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

function UpdateShow({
  userAdmin,
  setOpenAlert,
  setMessageInfo,
  setNewBand,
  newBand,
}: UpdateShowProps) {
  const [showBandBody, setShowBandBody] = React.useState<ShowBandBody[]>([]);
  const [showSelected, setShowSelected] = React.useState<ShowSelected>({
    showId: "",
    day: "",
    band: "",
    startTime: "",
    endTime: "",
  });

  useMemo(() => {
    const show = showBandBody.find((show) => show.band === showSelected.band);
    if (show) {
      setShowSelected({
        ...showSelected,
        showId: show.id,
      });
    }
  }, [showSelected.band]);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    if (name === "day") {
      setShowSelected({
        ...showSelected,
        day: value,
        band: "",
        startTime: "",
        endTime: "",
      });

      showService.getShowsByDate(value).then((shows) => {
        const bandPromises = shows.map((show) => {
          return bandService.getBandById(show.band_id).then((band) => ({
            id: show.id,
            day: show.week_day,
            band: show.band_id,
            bandName: band.name,
            startTime: show.start_time.toString(),
            endTime: show.end_time.toString(),
          }));
        });

        Promise.all(bandPromises).then((showBandData) => {
          setShowBandBody(showBandData);
        });
      });
    } else {
      setShowSelected({
        ...showSelected,
        [name]: value,
      });
    }
  };

  const disableButton: boolean = !userAdmin || hasEmptyProperties(showSelected);

  const onClick = async (showSelected: ShowSelected) => {
    await showService.updateShow(showSelected);
    setShowSelected({
      showId: "",
      day: "",
      startTime: "",
      endTime: "",
      band: "",
    });
    setOpenAlert(true);
    setNewBand(!newBand);
    setMessageInfo({
      message: "Show updated successfully!",
      severity: "success",
    });
  };

  const timeEndOptions = timeOptions.filter(
    (option) =>
      (option.value > showSelected.startTime &&
        option.value <= showSelected.startTime + 3) ||
      option.value === ""
  );

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Update a show
      </Typography>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Day</InputLabel>
        <Tooltip title="3 shows a day" placement="top">
          <Select
            value={showSelected.day}
            onChange={handleChange}
            name="day"
            type="text"
          >
            {weekDays.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Band</InputLabel>
        <Select
          value={showSelected.band}
          onChange={handleChange}
          name="band"
          type="text"
        >
          {showBandBody && showBandBody.length > 0 ? (
            showBandBody.map((show, index) => (
              <MenuItem key={index} value={show.band}>
                {show.bandName}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Start</InputLabel>
        <Select
          value={showSelected.startTime}
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
          value={showSelected.endTime}
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
      <Button
        sx={{
          marginTop: "20px",
          color: "#E75099",
          borderBlockColor: "#E75099",
        }}
        variant="outlined"
        disabled={disableButton}
        onClick={() => onClick(showSelected)}
      >
        UPDATE
      </Button>
    </>
  );
}

export default UpdateShow;
