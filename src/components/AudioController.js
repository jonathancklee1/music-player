import React, { useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [
    { currentSong, playing, isFav, currentPlaylist, trackNumber },
    dispatch,
  ] = useDataLayerValue();
  const favAddedMsg = () =>
    toast.success("Added to your favourites in Spotify");
  const favRemovedMsg = () =>
    toast.warn("Removed from your favourites in Spotify");
  const favErrorMsg = () =>
    toast.error("Song not selected or is already in your favourites!");
  const previewErrorMsg = () => toast.error("No preview available");

  let audio = useRef();
  useEffect(() => {
    checkFavourite();
    if (currentSong && !currentSong?.preview_url) {
      previewErrorMsg();
    }
    if (audio.currentTime === 0) {
      playing = false;
    }
    if (!playing) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
  }, [currentSong, playing]);

  // Set current song when playlist or track number changes
  useEffect(() => {
    if (currentPlaylist) {
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: currentPlaylist[trackNumber].track,
      });
    }
  }, [currentPlaylist, trackNumber]);

  function togglePlay() {
    dispatch({
      type: "SET_PLAYING",
      playing: !playing,
    });
  }

  // Sets current song that is playing to favourite in Spotify
  async function setFavourite() {
    if (!isFav && currentSong) {
      s.addToMySavedTracks([currentSong?.id]);
      dispatch({
        type: "SET_ISFAV",
        isFav: true,
      });
      favAddedMsg();
    } else if (isFav && currentSong) {
      s.removeFromMySavedTracks([currentSong?.id]);
      dispatch({
        type: "SET_ISFAV",
        isFav: false,
      });
      favRemovedMsg();
    } else {
      favErrorMsg();
    }
  }

  // Checks if selected song is already in favourites playlist
  function checkFavourite() {
    try {
      const inSavedTracks = s
        .containsMySavedTracks([currentSong?.id])
        .then((result) => {
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
        })
        .catch((error) => console.log(error));
      return inSavedTracks;
    } catch (error) {
      alert("No song selected!");
    }
  }

  // Gets the next track in the current playlist
  function getNextTrack() {
    if (currentPlaylist) {
      if (trackNumber === currentPlaylist.length - 1) {
        dispatch({
          type: "SET_TRACK_NUMBER",
          trackNumber: 0,
        });
      } else {
        dispatch({
          type: "SET_TRACK_NUMBER",
          trackNumber: trackNumber + 1,
        });
      }
    }
  }

  // Gets the previous track in the current playlist
  function getPrevTrack() {
    if (currentPlaylist) {
      if (trackNumber === 0) {
        dispatch({
          type: "SET_TRACK_NUMBER",
          trackNumber: currentPlaylist.length - 1,
        });
      } else {
        dispatch({
          type: "SET_TRACK_NUMBER",
          trackNumber: trackNumber - 1,
        });
      }
    }
  }

  return (
    <>
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="controller__wrapper">
        <audio
          ref={audio}
          src={!currentSong?.preview_url ? "" : currentSong?.preview_url}
          onEnded={() => {
            dispatch({
              type: "SET_PLAYING",
              playing: false,
            });
          }}
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
            <div className="controls controls__prev" onClick={getPrevTrack}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </div>
            <div className="controls controls__play" onClick={togglePlay}>
              {playing ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
            <div className="controls controls__next" onClick={getNextTrack}>
              <FontAwesomeIcon icon={faForwardStep} />
            </div>
            <div className="favourite-btn" onClick={setFavourite}>
              <FontAwesomeIcon icon={isFav ? faHeart : faRegHeart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioController;
