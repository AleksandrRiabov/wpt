import { useState } from "react";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { tokens } from "../../theme";
import LeftSideNavbar from "./LeftSideNavbar";
import MobileNavbar from "./MobileNavbar";
import RightSideNavbar from "./RightSideNavbar";

const pages = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Configurations", url: "/config" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(
    null
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: colors.primary[700],
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Side of the Navbar. Logo, Pages.. */}
          <LeftSideNavbar
            pages={pages}
            handleCloseNavMenu={handleCloseNavMenu}
          />

          {/* Small Screen Navbar Left Side */}
          <MobileNavbar
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
            handleCloseNavMenu={handleCloseNavMenu}
            pages={pages}
          />

          {/* Right Side Of the Navbar (Avatar, Login .. ) */}
          <RightSideNavbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
