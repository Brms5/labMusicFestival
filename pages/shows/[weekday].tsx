import { Box, Card, List } from "@mui/material";
import { Show } from "@server/schema/show";
import { showService } from "@ui/services/show";
import BandInfo from "components/bandInfo/bandInfo";
import { useRouter } from "next/router";
import React from "react";

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
      <Box>
        <Card
          sx={{
            width: 300,
            height: 400,
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
