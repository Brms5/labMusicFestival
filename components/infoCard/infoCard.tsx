import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function InfoCard() {
  return (
    <Box>
      <Card
        sx={{
          width: 600,
          height: 350,
          backgroundImage: "url(/background-paper.jpeg)",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image="/rockbands.jpeg"
          alt="show-audience"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: 150,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            MUSIC FESTIVAL
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This project is a web application that allows users to view a list
            of shows and their details. The application is built using React,
            throw the framework Next.js. The application is deployed on Vercel.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InfoCard;
