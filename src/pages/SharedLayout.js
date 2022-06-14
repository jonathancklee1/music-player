import React from "react";
import Navbar from "../components/Navbar";
import AudioController from "../components/AudioController";
import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <AudioController />
    </>
  );
}

export default SharedLayout;
