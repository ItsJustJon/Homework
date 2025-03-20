import React from "react";
import { Link } from "react-router-dom";
// import "./Header.css";

function Header() {
  return (
    <header>
      <h1>Jonathan Hummer</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link" activeClassName="active">
              About Me
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="nav-link" activeClassName="active">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" activeClassName="active">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/resume" className="nav-link" activeClassName="active">
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
