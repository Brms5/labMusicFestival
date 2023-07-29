import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

const style = {
  width: "100%",
  // maxWidth: 360,
  // bgcolor: "background.paper",
};

function BandInfo() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Divider />
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "space-between",
          // backgroundColor: "yellow",
        }}
      >
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          Depeche Mode / Rock
        </ListItemText>
        <ListItemText primaryTypographyProps={{ fontSize: "12px" }}>
          17:00 - 19:00
        </ListItemText>
      </ListItem>
      <Divider />
    </List>
  );
}

export default BandInfo;
