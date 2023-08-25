import React from "react";
import { Typography } from "@mui/material";
import { Show } from "@server/schema/show";
import { bandService } from "@ui/services/band";
import { Band } from "@server/schema/band";
import BandImage from "components/bandImage/bandImage";

interface InputBandInfo {
  show: Show;
  weekDayColor: string | undefined;
}

function BandInfo({ show, weekDayColor }: InputBandInfo) {
  const [band, setBand] = React.useState<Band>({} as Band);
  console.log(weekDayColor);
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
          <BandImage bandImage={band.band_image} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
              // height: "150px",
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: `${
                  weekDayColor == "#FBF504" ? "#FFD700" : weekDayColor
                }`,
                textDecoration: "none",
              }}
            >
              {`${band.name}`}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              {`${band.music_genre}`}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              {`${show.start_time}:00 - ${show.end_time}:00`}
            </Typography>
          </div>
        </>
      )}
    </>
  );
}

export default BandInfo;
