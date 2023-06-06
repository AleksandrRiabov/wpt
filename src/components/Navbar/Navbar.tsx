import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const pages = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Configurations", url: "/config" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null
  );

  const navigate = useNavigate();
  const { user, signOutUser } = UserAuth();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const isDarkMode = theme.palette.mode === "dark";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event && setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      console.log("User logged out!");
    } catch (error: any) {
      console.log(error.message);
    }
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
          <LocalShippingIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WPT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalShippingIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.url}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}>
              <IconButton onClick={colorMode.toggleColorMode} sx={{ mr: 2 }}>
                {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>
            </Tooltip>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.photoURL || "/static/images/avatar/2.jpg"}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to={"/login"}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.secondary[500], display: "inline" }}
                >
                  {" "}
                  LOGIN
                </Typography>
              </Link>
            )}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleSignOut} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
