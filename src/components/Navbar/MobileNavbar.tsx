import { Typography } from "@mui/material";
import BurgerMenu from "./BurgerMenu";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";

type Page = {
  name: string;
  url: string;
};

type Props = {
  anchorElNav: HTMLButtonElement | null;
  setAnchorElNav: (el: HTMLButtonElement | null) => void;
  handleCloseNavMenu: () => void;
  pages: Page[];
};

const MobileNavbar = ({
  anchorElNav,
  setAnchorElNav,
  handleCloseNavMenu,
  pages,
}: Props) => {
  return (
    <>
      <BurgerMenu
        anchorElNav={anchorElNav}
        setAnchorElNav={setAnchorElNav}
        handleCloseNavMenu={handleCloseNavMenu}
        pages={pages}
      />
      <LocalShippingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        WPT
      </Typography>
    </>
  );
};

export default MobileNavbar;
