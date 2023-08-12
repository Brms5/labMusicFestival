import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "./style";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { ShowInfo } from "components/layout";

interface inputShowCard {
  showInfo: ShowInfo;
}

export default function ShowCard({ showInfo }: inputShowCard) {
  const router = useRouter();

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
      <CardActionArea
        sx={{ width: "100%", height: "100%" }}
        onClick={() => router.push(`/shows/${showInfo.day.weekDay}`)}
      >
        <CardContent>
          <h1>{`${showInfo.day.weekDay}`}</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
