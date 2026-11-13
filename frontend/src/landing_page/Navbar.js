import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["About", "/about"],
  ["Products", "/products"],
  ["Pricing", "/pricing"],
  ["Support", "/support"],
  ["Login", "/login"],
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-shell">
      <nav className="container site-navbar navbar navbar-expand-md" aria-label="Main navigation">
        <Link className="site-brand navbar-brand me-auto" to="/" onClick={closeMenu}>
          <img src="/media/images/logo.svg" alt="Investify home" />
        </Link>
        <button
          className={`nav-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>
        <div className={`site-nav-wrap navbar-collapse justify-content-end${menuOpen ? " is-open" : ""}`} id="site-navigation">
          <div className="site-nav navbar-nav align-items-md-center">
            {links.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={closeMenu} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                {label}
              </NavLink>
            ))}
            <NavLink className="nav-link signup-link" to="/signup" onClick={closeMenu}>Open an account</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
