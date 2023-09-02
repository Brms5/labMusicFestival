import React, { useMemo } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { bandService } from "@ui/services/band";
import { showService } from "@ui/services/show";
import { hasEmptyProperties } from "src/utils/utils";
import { MessageInfo } from "pages/users/[userid]";

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

interface ShowBandBody {
  id: string;
  day: string;
  band: string;
  bandName: string;
  startTime: string;
  endTime: string;
}

interface ShowSelected {
  showId: string;
  day: string;
  band: string;
  startTime: string;
  endTime: string;
}

interface DeleteShowProps {
  userAdmin: boolean | undefined;
  setOpenAlert: (openAlert: boolean) => void;
  setMessageInfo: (messageInfo: MessageInfo) => void;
}

function DeleteShow({
  userAdmin,
  setOpenAlert,
  setMessageInfo,
}: DeleteShowProps) {
  const [showBandBody, setShowBandBody] = React.useState<ShowBandBody[]>([]);
  const [showSelected, setShowSelected] = React.useState<ShowSelected>({
    showId: "",
    day: "",
    band: "",
    startTime: "",
    endTime: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
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

  useMemo(() => {
    const show = showBandBody.find((show) => show.band === showSelected.band);
    if (show) {
      setShowSelected({
        ...showSelected,
        showId: show.id,
        startTime: show.startTime,
        endTime: show.endTime,
      });
    }
  }, [showSelected.band]);

  const disableButton: boolean = !userAdmin || hasEmptyProperties(showSelected);

  const onClick = async (showSelect: ShowSelected) => {
    await showService.deleteShow(showSelect.showId);
    setShowSelected({
      showId: "",
      day: "",
      band: "",
      startTime: "",
      endTime: "",
    });
    setOpenAlert(true);
    setMessageInfo({
      message: "Show deleted successfully!",
      severity: "success",
    });
  };

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Delete a show
      </Typography>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>Day</InputLabel>
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
          value={showSelected.startTime || ""}
          // onChange={() => handleShowToDelete}
          name="startTime"
          type="text"
        >
          {showSelected ? (
            <MenuItem key={showSelected.band} value={showSelected.startTime}>
              {showSelected.startTime}
            </MenuItem>
          ) : (
            <MenuItem key="" value="">
              None
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel>End</InputLabel>
        <Select
          value={showSelected?.endTime || ""}
          // onChange={() => handleShowToDelete}
          name="endTime"
          type="text"
        >
          {showSelected ? (
            <MenuItem key={showSelected.band} value={showSelected.endTime}>
              {showSelected.endTime}
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
          color: "#E75099",
          borderBlockColor: "#E75099",
        }}
        variant="outlined"
        disabled={disableButton}
        onClick={() => onClick(showSelected)}
      >
        DELETE
      </Button>
    </>
  );
}

export default DeleteShow;
