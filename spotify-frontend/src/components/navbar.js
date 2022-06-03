import { Link } from "react-router-dom";
import { Button, Typography, AppBar, Toolbar, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    selected: {
      main: '#1DB954',
      contrastText: '#fff',
    },
  },
});

const navbarData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Forum",
    href: "/Forum",
  },
  {
    label: "Liked Songs",
    href: "/LikedSongs",
  },
  {
    label: "Top Songs",
    href: "/TopSongs",
  },
  {
    label: "Top Artists",
    href: "/TopArtists",
  },
  {
    label: "Inbox",
    href: "/Inbox",
  },
  {
    label: "User Profile",
    href: "/UserProfile",
  },
  {
    label: "Log Out",
    href: "/LogOut",
  },
];

function Navbar(props) {
  const { accessToken } = useContext(AccessTokenContext);

  const displayDesktop = () => {
    return (
      <ThemeProvider theme={theme}>

        <Toolbar className="bar" color="neutral">
          {projectLogo}
          <div>{getMenuButtons()}</div>
        </Toolbar>
      </ThemeProvider>)
      ;
  };

  const getMenuButtons = () => {
    return navbarData.map(({ label, href }) => {
      if (props.setPage === label) {
        return (
          <ThemeProvider theme={theme}>
            <Button
              {...{
                variant: "contained",
                key: label,
                color: "selected",
                to: href,
                component: Link,

              }}
            >
              {label}
            </Button>
          </ThemeProvider>
        );
      }
      return (
        <Button
        disabled = {!accessToken}
          {...{

            key: label,
            color: "inherit",
            to: href,
            component: Link,

          }}
        >
          {label}
        </Button>
      );
    });
  };


  const projectLogo = (
    <Typography variant="h6" component="h1" className="logo">
      S-Message
    </Typography>
  );

  return (
    <header>
      <ThemeProvider theme={theme}>

        <AppBar className="header" style={{ backgroundColor: "black" }}>{displayDesktop()}</AppBar>

      </ThemeProvider>
    </header>
  );
}

export default Navbar;
