import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./index.css";
import SpotifyApp from "./components/spotifyApp";
import Forum from "./components/forum";
import LikedSongs from "./components/likedSongs";
import TopSongs from "./components/topSongs";
import TopArtists from "./components/topArtists";
import Inbox from "./components/inbox";
import UserProfile from "./components/userProfile";
import IndivForum from "./components/IndivForum";
import OtherUserComponent from "./components/otherUserComponent";
import Navbar from "./components/navbar";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SpotifyApp />} />
      <Route path="Forum" element={<Forum />} />
      <Route path="LikedSongs" element={<LikedSongs />} />
      <Route path="TopSongs" element={<TopSongs />} />
      <Route path="TopArtists" element={<TopArtists />} />
      <Route path="Inbox" element={<Inbox />} />
      <Route path="UserProfile" element={<UserProfile />} />
      <Route path='OtherUserComponent' element={<OtherUserComponent />} />
      <Route path='Forum/indivForum' element={<IndivForum />} />
      <Route path="NavBar" element={<Navbar />} />

    </Routes>
  </BrowserRouter>,
  rootElement
);

