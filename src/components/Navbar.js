import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDataLayerValue } from "../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

const s = new SpotifyWebApi();
function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!isOpen);
  };
  const [{ user }, dispatch] = useDataLayerValue();

  // Set current user
  useEffect(() => {
    s.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);

  return (
    <nav className="navbar">
      <h1> Musicify</h1>

      <ul className={isOpen ? "navbar__list open" : "navbar__list"}>
        <li>
          <Link to="/" onClick={handleToggle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="recommend" onClick={handleToggle}>
            Recommendations
          </Link>
        </li>
        <li>
          <Link to="categories" onClick={handleToggle}>
            Discover
          </Link>
        </li>
        <li>
          <Link to="library" onClick={handleToggle}>
            Your Library
          </Link>
        </li>
      </ul>
      <img
        className="profile-icon"
        src={user?.images[0].url}
        alt={user?.name}
      ></img>
      <FontAwesomeIcon icon={faBars} onClick={handleToggle} />
    </nav>
  );
}

export default Navbar;
