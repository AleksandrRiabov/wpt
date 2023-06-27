import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { GridMenuIcon } from "@mui/x-data-grid";

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

const BurgerMenu = ({
  anchorElNav,
  setAnchorElNav,
  handleCloseNavMenu,
  pages,
}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event && setAnchorElNav(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <GridMenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
            <Link to={page.url}>
              <Typography
                sx={{
                  color: colors.secondary[500],
                  textTransform: "uppercase",
                }}
                textAlign="center"
              >
                {page.name}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BurgerMenu;
