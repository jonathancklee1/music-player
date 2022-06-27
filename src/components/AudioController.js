import React, { useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faPause,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";

const s = new SpotifyWebApi();
function AudioController() {
  const [{ currentSong, playing, isFav }, dispatch] = useDataLayerValue();

  let audio = useRef();
  useEffect(() => {
    checkFavourite();
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

  async function setFavourite() {
    console.log(isFav);
    if (!isFav && currentSong) {
      s.addToMySavedTracks([currentSong?.id]);
      dispatch({
        type: "SET_ISFAV",
        isFav: true,
      });
    } else {
      alert("Song unavailable or is already in your favourites!");
    }
  }
  function checkFavourite() {
    return s.containsMySavedTracks([currentSong?.id]).then((result) => {
      if (result[0] === true) {
        dispatch({
          type: "SET_ISFAV",
          isFav: true,
        });
      } else {
        dispatch({
          type: "SET_ISFAV",
          isFav: false,
        });
      }
      return result[0];
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
          <div className="favourite-btn" onClick={setFavourite}>
            <FontAwesomeIcon icon={isFav ? faHeart : faRegHeart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioController;
