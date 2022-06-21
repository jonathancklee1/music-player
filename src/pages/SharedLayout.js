import React from "react";
import Navbar from "../components/Navbar";
import AudioController from "../components/AudioController";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function SharedLayout() {
  const [playlistId, setPlaylistId] = useState("");
  return (
    <>
      <Navbar />
      <Outlet context={[playlistId, setPlaylistId]} />
      <AudioController playlistId={playlistId} />
    </>
  );
}

export default SharedLayout;
