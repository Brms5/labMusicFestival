import React from "react";
import { useRouter } from "next/router";
import { Box, Card, List } from "@mui/material";
import { Show } from "@server/schema/show";
import { showService } from "@ui/services/show";
import BandInfo from "components/bandInfo/bandInfo";
import ShowCard from "components/showCard/showCard";
import { CardsContainer } from "pages/style";

export interface ShowInfo {
  day: WeekDay;
  color: string;
}

export interface WeekDay {
  weekDay: string;
  monthDay: number;
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthDays = [24, 25, 26, 27, 28, 29, 30];
const days: WeekDay[] = [];
for (let i = 0; i < weekDays.length; i++) {
  const obj: WeekDay = {
    weekDay: weekDays[i],
    monthDay: monthDays[i],
  };
  days.push(obj);
}

const colors = [
  "#009EC9",
  "#FBF504",
  "#E5291E",
  "#0E8B3B",
  "#E75099",
  "#F6A20F",
  "#6C45A6",
];
const shows: ShowInfo[] = [];
for (let i = 0; i < colors.length; i++) {
  const obj: ShowInfo = {
    day: days[i],
    color: colors[i],
  };
  shows.push(obj);
}

const cardShows = shows.map((showInfo, index) => {
  return <ShowCard key={index} showInfo={showInfo} />;
});

function WeekDay() {
  const [shows, setShows] = React.useState<Show[]>([]);

  const router = useRouter();
  const { weekday } = router.query;

  React.useEffect(() => {
    setShows([]);
    showService
      .getShowsByDate(weekday as string)
      .then((band) => {
        setShows(band);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [weekday]);

  const showBands = shows.map((show, index) => {
    return <BandInfo show={show} key={index} />;
  });

  return (
    <>
      <CardsContainer>{cardShows}</CardsContainer>
      <Box>
        <Card
          sx={{
            width: 300,
            height: 400,
            marginBottom: 2,
            backgroundImage: "url(/background-paper.jpeg)",
          }}
        >
          <List component="nav" aria-label="mailbox folders">
            {shows.length > 0 ? showBands : <div>NO SHOWS...</div>}
          </List>
        </Card>
      </Box>
    </>
  );
}

export default WeekDay;
