import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./Context/Auth";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success("Logout Successfully");
        setAuth((prev) => {
          return { ...prev, user: null, success: null };
        });
        navigate("/voter-login");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            GEVS
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/voter/voter-dashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Voter
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/admin-dashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            </li>
          </ul>
          {button && (
            <>
              {!auth.success ? (
                <>
                  <Button buttonStyle="btn--outline" to="/voter-signup">
                    SIGN UP
                  </Button>
                  <Button buttonStyle="btn--outline" to="/voter-login">
                    login
                  </Button>
                </>
              ) : (
                <button
                  className="btn btn-outline-danger"
                  to="/voter-login"
                  style={{ border: "1px solid #dc3545" }}
                  onClick={handleLogout}
                >
                  logout
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
