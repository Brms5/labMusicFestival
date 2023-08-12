import React from "react";
import { ListItem, ListItemText, Divider } from "@mui/material";
import { Show } from "@server/schema/show";
import { bandService } from "@ui/services/band";
import { Band } from "@server/schema/band";

interface InputBandInfo {
  show: Show;
  color: string;
}

function BandInfo({ show, color }: InputBandInfo) {
  const [band, setBand] = React.useState<Band>({} as Band);

  React.useEffect(() => {
    setBand({} as Band);
    bandService
      .getBandById(show.band_id)
      .then((band) => {
        setBand(band);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show.band_id]);

  return (
    <>
      {band.id === undefined ? (
        <div>CARREGANDO LINEUP...</div>
      ) : (
        <>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: color,
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
        </>
      )}
    </>
  );
}

export default BandInfo;
