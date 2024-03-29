/* IMPORTS */
// React
import React, { useContext, useEffect } from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
// Internal services
// Components
import CheckTokenComponent from "./CheckTokenComponent";
// Internal functions
import checkVisibility from "../common/js/checkVisibility";
// Contexts
import { AuthContext } from "../contexts/AuthContext";
// Material UI Components
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
import HiveIcon from "@mui/icons-material/Hive";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Main menu of Glitch Reporter.

*/

function Navbar() {
  const { push } = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const pages = [
    { label: "Login", showRule: "Not logged in" },
    {
      label: "Register",
      showRule: "Not logged in",
    },
    {
      label: "About",
      showRule: "Always",
    },
    {
      label: "Dashboard",
      showRule: "Users level",
    },
    {
      label: "Administration",
      showRule: "Admin only",
    },
  ];

  const settingsItems = [
    {
      label: "Logout",
      action: "logout",
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingItemAction = (setting) => {
    if (setting.action === "link") {
      return push(`/${setting.label.toLowerCase()}`);
    }

    if (setting.action === "logout") {
      return logout();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HiveIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => push("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Glitch Reporter
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
              {pages.map((page) => {
                const isVisible = checkVisibility(state, page.showRule);
                if (isVisible) {
                  return (
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                      <Typography
                        onClick={() => {
                          push(`/${page.label.toLowerCase()}`);
                        }}
                        textAlign="center"
                      >
                        {page.label}
                      </Typography>
                    </MenuItem>
                  );
                } else return null;
              })}
            </Menu>
          </Box>
          <HiveIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              push("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            G/REP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, id) => {
              const isVisible = checkVisibility(state, page.showRule);
              if (isVisible) {
                return (
                  <Button
                    key={id}
                    onClick={() => {
                      handleCloseNavMenu(),
                        push(`/${page.label.toLowerCase()}`);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                );
              }
            })}
          </Box>

          {checkVisibility(state, "Users level") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={state.user.username}
                    src="/static/images/avatar/2.jpg"
                  />
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
                {settingsItems.map((setting, id) => (
                  <MenuItem key={id} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => settingItemAction(setting)}
                    >
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <CheckTokenComponent />
    </AppBar>
  );
}
export default Navbar;
