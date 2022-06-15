import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  return (
    <nav className="navbar">
      <h1> Musicify</h1>
      <Link to="/">Home</Link>
      <Link to="library">Your Library</Link>
      <FontAwesomeIcon icon={faBars} />
    </nav>
  );
}

export default Navbar;
