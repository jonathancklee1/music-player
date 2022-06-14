import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1> Music Playa</h1>
      <Link to="/">Home</Link>
      <Link to="library">Your Library</Link>
    </nav>
  );
}

export default Navbar;
