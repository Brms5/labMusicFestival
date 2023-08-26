import React, { useEffect } from "react";
import { GlobalContext } from "src/context/GlobalContext";
import Profile from "components/profile/profile";
import CreateBand from "components/createBand/createBand";
import CreateShow from "components/createShow/createShow";
import { BandShowContainer, UserPageContainer } from "./style";
import { bandService } from "@ui/services/band";
import { BandResponse } from "@ui/types/band";

function UserPage() {
  const { userLogged, userAdmin, setUserAdmin } =
    React.useContext(GlobalContext);
  const [bands, setBands] = React.useState<BandResponse[]>([]);

  useEffect(() => {
    bandService.getBands().then((res) => {
      setBands(res);
    });
  }, []);

  return (
    <UserPageContainer>
      <Profile
        userLogged={userLogged}
        userAdmin={userAdmin}
        setUserAdmin={setUserAdmin}
      />
      <BandShowContainer>
        <CreateBand userAdmin={userAdmin} />
        <CreateShow bands={bands} userAdmin={userAdmin} />
      </BandShowContainer>
    </UserPageContainer>
  );
}

export default UserPage;
