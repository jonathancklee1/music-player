import React, { useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";

const s = new SpotifyWebApi();
function AudioController() {
  const [{ currentSong, playing }, dispatch] = useDataLayerValue();

  
  let audio = useRef();
  useEffect(() => {
    if (currentSong && currentSong?.preview_url == null) {
      alert("No Preview available");
    }
    if (!playing) {
      console.log("not playing");
      audio.current.pause();
    } else {
      console.log(" playing");
      audio.current.play();
    }
  }, [currentSong, playing]);
  function togglePlay() {
    dispatch({
      type: "SET_PLAYING",
      playing: !playing,
    });
  }
  return (
    <>
      <div className="controller__wrapper">
        <audio
          ref={audio}
          src={!currentSong?.preview_url ? "" : currentSong?.preview_url}
        />
        <div className="controller">
          <img
            className="controller__img"
            src={
              currentSong
                ? currentSong?.album.images[0].url
                : "../assets/img/gunship.webp"
            }
            alt={currentSong?.name}
          ></img>
          <div className="controller__info">
            <p>{currentSong ? "Now Playing" : "No Songs Currently Playing"}</p>
            <h2 className="controller__song">
              {currentSong ? currentSong?.name : ""}
            </h2>
            <h3 className="controller__artist">
              {currentSong ? currentSong?.artists[0].name : ""}
            </h3>
          </div>
          <div className="controls-wrapper">
            <div className="controls controls__prev">
              <FontAwesomeIcon icon={faBackwardStep} />
            </div>
            <div className="controls controls__play" onClick={togglePlay}>
              {playing ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
            <div className="controls controls__next">
              <FontAwesomeIcon icon={faForwardStep} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioController;
