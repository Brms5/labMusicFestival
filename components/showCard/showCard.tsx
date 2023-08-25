import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "./style";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { ShowInfo } from "pages";

interface inputShowCard {
  showInfo: ShowInfo;
}

export default function ShowCard({ showInfo }: inputShowCard) {
  const router = useRouter();

  const goToShows = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token == null) {
        router.push("/login");
        return;
      }
    }
    router.push(`/shows/${showInfo.day.weekDay}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height:
          showInfo.day.monthDay === 25 ||
          showInfo.day.monthDay === 27 ||
          showInfo.day.monthDay === 29
            ? "85%"
            : "100%",
        backgroundColor: `${showInfo.color}`,
      }}
    >
      <CardActionArea
        sx={{ width: "100%", height: "100%" }}
        onClick={goToShows}
      >
        <CardContent>
          <h1>{`${showInfo.day.weekDay}`}</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
