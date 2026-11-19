import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../config";
import { api, getStoredUser } from "../api";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const user = getStoredUser();

  const username = user?.username || "User";

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = " menu selected";
  return (
    <div className="menu-container">
      <img src="logo.png" alt="Investify" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                TradeHistory
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">
            {username?.substring(0, 2).toUpperCase()}
          </div>
          <p className="username">{username}▼</p>
        </div>
        {isProfileDropdownOpen && (
  <div className="profile-dropdown">
    {logoutError && <p role="alert" className="text-danger">{logoutError}</p>}
    <button
      className="dropdown-item"
      disabled={isLoggingOut}
      onClick={async () => {
        setIsLoggingOut(true);
        setLogoutError("");
        try {
          await api.post("/auth/logout");
          try { localStorage.removeItem("token"); localStorage.removeItem("user"); } catch (_error) { /* storage can be unavailable */ }
          window.location.replace(FRONTEND_URL);
        } catch (error) {
          setLogoutError(error.response?.data?.message || "Unable to log out while the server is unavailable. Please retry.");
          setIsLoggingOut(false);
        }
      }}
    >
      {isLoggingOut ? "Logging out…" : "Logout"}
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default Menu;
