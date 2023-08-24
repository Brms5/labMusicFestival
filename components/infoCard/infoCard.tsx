import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function InfoCard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "610px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          marginBottom: 2,
          backgroundImage: "url(/background-paper.jpeg)",
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image="/rockbands.jpeg"
          alt="show-audience"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#38B3EE",
              textDecoration: "none",
            }}
          >
            MUSIC FESTIVAL
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This web app is built using React, throw the framework Next.js. The
            application is deployed on Vercel.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InfoCard;
