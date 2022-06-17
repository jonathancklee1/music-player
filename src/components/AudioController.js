import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
function AudioController() {
  return (
    <div className="controller__wrapper">
      <div className="controller">
        <img
          className="controller__img"
          src={require("../assets/img/gunship.webp")}
        ></img>
        <div className="controller__info">
          <p>Now Playing</p>
          <h2 className="controller__song">Tech Noir</h2>
          <h3 className="controller__artist">Gunship</h3>
        </div>
        <div className="controls-wrapper">
          <div className="controls controls__prev">
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div className="controls controls__play">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className="controls controls__next">
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioController;
