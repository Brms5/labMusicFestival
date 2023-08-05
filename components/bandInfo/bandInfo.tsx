import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Show } from "@server/schema/show";
import { bandService } from "@ui/services/band";
import { Band } from "@server/schema/band";

const style = {
  width: "100%",
  // maxWidth: 360,
  // bgcolor: "background.paper",
};

interface InputBandInfo {
  show: Show;
}

function BandInfo({ show }: InputBandInfo) {
  const [band, setBand] = React.useState<Band>({} as Band);

  React.useEffect(() => {
    bandService
      .getBandById(show.band_id)
      .then((response) => {
        setBand(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "space-between",
          // backgroundColor: "yellow",
        }}
      >
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          {`${band.name} / ${band.music_genre}`}
        </ListItemText>
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          {`${show.start_time}:00 - ${show.end_time}:00`}
        </ListItemText>
      </ListItem>
      <Divider />
    </List>
  );
}

export default BandInfo;
