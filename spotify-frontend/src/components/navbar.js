import { Link, Outlet } from "react-router-dom";
import { TextField, Box, Button, Typography, AppBar, Toolbar } from '@mui/material'
import React, { useRef } from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

function Navbar() {

    const displayDesktop =()=>{
        return ( 
        <Toolbar className="bar">
            {projectLogo}
            <div>{getMenuButtons()}</div>
        </Toolbar>)
        ;
    };

    const getMenuButtons = () => {
        return navbarData.map(({ label, href }) => {
          return (
            <Button
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
          Spotify App
        </Typography>
        );

  return (
    <header>
    <AppBar className="header">{displayDesktop()}</AppBar>
    </header>
  );
}

export default Navbar;
