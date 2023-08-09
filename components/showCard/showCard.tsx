import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader } from "./style";
import { ShowInfo } from "pages";
import BandInfo from "components/bandInfo/bandInfo";
import Button from "@mui/material/Button";
import { showService } from "@ui/services/show";
import { Show } from "@server/schema/show";
import { CardActionArea, Divider } from "@mui/material";

interface inputShowCard {
  showInfo: ShowInfo;
}

export default function ShowCard({ showInfo }: inputShowCard) {
  const [shows, setShows] = React.useState<Show[]>([]);

  React.useEffect(() => {
    showService
      .getShowsByDate(showInfo.day.weekDay)
      .then((response) => {
        setShows(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card
      sx={{
        width: 140,
        height:
          showInfo.day.monthDay === 25 ||
          showInfo.day.monthDay === 27 ||
          showInfo.day.monthDay === 29
            ? "80%"
            : "100%",
        backgroundColor: `${showInfo.color}`,
      }}
    >
      <CardActionArea sx={{ width: "100%", height: "100%" }}>
        <CardContent>
          <h1>{`${showInfo.day.weekDay}`}</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
