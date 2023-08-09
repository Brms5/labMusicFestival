import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

function InfoCard() {
  return (
    <Box>
      <Card sx={{ width: 600, height: 250, marginBottom: 5 }}>
        <CardActionArea sx={{ width: "100%", height: "100%" }}>
          <CardMedia
            component="img"
            height="120"
            image="/rockbands.jpeg"
            alt="show-audience"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              MUSIC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All tickets for the Festival are individually personalised to the
              named ticket holder and are strictly non-transferable. Security
              checks are carried out on arrival, and only the specified ticket
              holder will be admitted to the Festival.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ width: 600, height: 250 }}>
        <CardActionArea sx={{ width: "100%", height: "100%" }}>
          <CardMedia
            component="img"
            height="120"
            // image="/static/images/cards/contemplative-reptile.jpg"
            // alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              MUSIC
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All tickets for the Festival are individually personalised to the
              named ticket holder and are strictly non-transferable. Security
              checks are carried out on arrival, and only the specified ticket
              holder will be admitted to the Festival.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default InfoCard;
