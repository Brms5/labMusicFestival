import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { HeaderContainer } from "./style";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { GlobalContext } from "src/context/GlobalContext";
import { LoggedUser } from "@ui/types/user";

function Header() {
  const { userLogged, setUserLogged } = React.useContext(GlobalContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const router = useRouter();

  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const settings = !token ? ["Login"] : ["Profile", "Logout"];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token == null) {
        router.push("/login");
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: LoggedUser = jwtDecode(token);
        setUserLogged(decodedToken);
        const currentTime = Date.now() / 1000; // Convert to seconds
        console.log("DECODE: ", decodedToken);

        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.removeItem("token"); // Remove the expired token
          router.push("/login");
        }
      } catch (error) {
        // Handle token decoding error if necessary
        console.error("Error decoding token:", error);
        router.push("/login");
      }
    }
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goHomePage = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token == null) {
        router.push("/login");
        return;
      }
    }
    router.push("/");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setUserLogged(null);
      router.push("/login");
    } else {
      return false;
    }
  };

  const menuActions = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      logout();
    } else if (setting === "Profile") {
      if (!userLogged) return;
      console.log("userLogged: ", userLogged);
      router.push(`/users/${userLogged.id}`);
    } else if (setting === "Login") {
      router.push("/login");
    }
  };

  return (
    <HeaderContainer>
      <Typography
        variant="h2"
        onClick={goHomePage}
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "#8f80bc",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        LIVE MUSIC
      </Typography>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, backgroundColor: "#2B9EC9" }}
          >
            <Avatar sx={{ bgcolor: "#2B9EC9" }}>
              {userLogged?.name ? userLogged.name[0] : null}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => menuActions(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </HeaderContainer>
  );
}

export default Header;
