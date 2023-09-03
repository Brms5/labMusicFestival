import React, { useEffect, useState } from "react";
import { GlobalContext } from "src/context/GlobalContext";
import Profile from "components/profile/profile";
import { bandService } from "@ui/services/band";
import { BandResponse } from "@ui/types/band";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { showService } from "@ui/services/show";
import { Show } from "@server/schema/show";
import CardShow from "components/cardShow/cardShow";
import CardBand from "components/cardBand/cardBand";
import { BandShowContainer, UserPageContainer } from "@ui/style/GlobalStyle";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface NumberShowsByDate {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}

export interface MessageInfo {
  message: string;
  severity: "success" | "error" | "info" | "warning" | undefined;
}

function UserPage() {
  const { userLogged, userAdmin, setUserAdmin } =
    React.useContext(GlobalContext);
  const [bands, setBands] = useState<BandResponse[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [newBand, setNewBand] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>();

  const numberShowsByDate: NumberShowsByDate = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  shows.forEach((show) => {
    const { week_day } = show;
    if (week_day in numberShowsByDate) {
      numberShowsByDate[week_day as keyof NumberShowsByDate] += 1;
    }
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    bandService.getBandsWithoutShow().then((res) => {
      setBands(res);
    });
    showService.getAllShows().then((res) => {
      setShows(res);
    });
  }, [newBand, openAlert]);

  return (
    <UserPageContainer>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo?.severity}
          sx={{ width: "100%" }}
        >
          {messageInfo?.message}
        </Alert>
      </Snackbar>
      <Profile
        userLogged={userLogged}
        userAdmin={userAdmin}
        setUserAdmin={setUserAdmin}
      />
      <BandShowContainer>
        <CardBand
          bands={bands}
          userAdmin={userAdmin}
          setNewBand={setNewBand}
          newBand={newBand}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
        />
        <CardShow
          bands={bands}
          userAdmin={userAdmin}
          setOpenAlert={setOpenAlert}
          setMessageInfo={setMessageInfo}
          numberShowsByDate={numberShowsByDate}
          setNewBand={setNewBand}
          newBand={newBand}
        />
      </BandShowContainer>
    </UserPageContainer>
  );
}

export default UserPage;
