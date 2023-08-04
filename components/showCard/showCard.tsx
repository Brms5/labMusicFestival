import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader } from "./style";
import { ShowInfo } from "pages";
import BandInfo from "components/bandInfo/bandInfo";
import Button from "@mui/material/Button";
import { showService } from "@ui/services/show";
import { Show } from "@server/schema/show";

const weekDays = ["THU", "FRI", "SAT", "SUN"];

interface inputShowCard {
  showInfo: ShowInfo;
}

export default function ShowCard({ showInfo }: inputShowCard) {
  const [shows, setShows] = React.useState<Show[]>([]);

  let weekDay: string;
  for (let i = 0; i < weekDays.length; i++) {
    if (showInfo.day.weekDay === weekDays[i]) {
      if (weekDays[i] === "THU") {
        weekDay = "Thursday";
      }
      if (weekDays[i] === "FRI") {
        weekDay = "Friday";
      }
      if (weekDays[i] === "SAT") {
        weekDay = "Saturday";
      }
      if (weekDays[i] === "SUN") {
        weekDay = "Sunday";
      }
    }
  }

  React.useEffect(() => {
    showService
      .getShowsByDate(weekDay)
      .then((response) => {
        setShows(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card
      sx={{ width: 220, height: 400, backgroundColor: `${showInfo.color}` }}
    >
      <CardHeader>
        <h1>{`${showInfo.day.monthDay} JUN - ${showInfo.day.weekDay}`}</h1>
      </CardHeader>
      <CardContent>
        {shows.map((show, index) => {
          return <BandInfo key={index} show={show} />;
        })}
        <Button
          style={{
            color: "black",
          }}
          variant="outlined"
          size="medium"
        >
          Ver mais
        </Button>
      </CardContent>
    </Card>
  );
}
