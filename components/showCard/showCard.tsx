import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader } from "./style";
import { ShowInfo } from "pages";
import BandInfo from "components/bandInfo/bandInfo";
import Button from "@mui/material/Button";

interface inputShowCard {
  showInfo: ShowInfo;
}

export default function ShowCard({ showInfo }: inputShowCard) {
  return (
    <Card
      sx={{ width: 220, height: 400, backgroundColor: `${showInfo.color}` }}
    >
      <CardHeader>
        <h1>{`${showInfo.day.monthDay} JUN - ${showInfo.day.weekDay}`}</h1>
      </CardHeader>
      <CardContent>
        <BandInfo />
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
