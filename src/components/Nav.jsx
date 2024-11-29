// import { useEffect } from "react";
// import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  console.log(token);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TaskManager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } text-color`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                about
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center ">
            <ul>
              <li className="nav-item">
                {token ? (
                  <Link
                    className="btn btn-danger  p-1"
                    to="/login"
                    onClick={() => {
                      Cookies.remove("token");
                    }}
                  >
                    logout
                  </Link>
                ) : (
                  <Link className="btn btn-primary  p-1" to="/login">
                    Login
                  </Link>
                )}

                {token ? (
                  ""
                ) : (
                  <Link className="btn btn-primary mx-2 p-1" to="/signup">
                    signup
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
