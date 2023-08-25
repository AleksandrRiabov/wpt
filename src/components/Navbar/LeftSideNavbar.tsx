import { Link, NavLink } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";
import { tokens } from "../../theme";

type Page = {
  name: string;
  url: string;
};

type Props = {
  pages: Page[];
  handleCloseNavMenu: () => void;
};

const LeftSideNavbar = ({ pages, handleCloseNavMenu }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Link to="/">
        <LocalShippingIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#fff" }}
        />
      </Link>
      <Link to="/">
        <Typography
          variant="h6"
          noWrap
          component="a"
          color="inherit"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          WPT
        </Typography>
      </Link>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Link key={page.name} to={page.url}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: colors.secondary[300],
                display: "block",
                fontWeight: 500,
              }}
            >
              {page.name}
            </Button>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default LeftSideNavbar;
