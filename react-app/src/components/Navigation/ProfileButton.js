import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="nav-bar-right-side-cursor" onClick={openMenu}>
        <button className="nav-icon-button" onClick={openMenu}>
          {/* <i className="fa-regular fa-user nav-icon"></i> */}
          {user.username[0]}
        </button>
        <i className="fa-solid fa-angle-left fa-rotate-270 tab-arrow nav-bar-right-arrow" onClick={openMenu}></i>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="nav-dropdown-top-text">
              <li>Hi, {user.username}</li>
              <li>{user.email}</li>
            </div>

            <div className="nav-dropdown-middle-text">
              <li>
                <NavLink to={{
                  pathname: `/${user.username}`,
                  state: { showBoards: true }
                }} onClick={closeMenu}>My Profile</NavLink>
              </li>
              {/* <li>
                <NavLink to={{
                  pathname: `/${user.username}`,
                  state: { showBoards: false }
                }}>My Pins</NavLink>
              </li> */}
              <li>
                <NavLink to="/settings" onClick={closeMenu} >Settings</NavLink>
              </li>
            </div>

            <li className="nav-dropdown-middle-text">
              <button onClick={handleLogout}>Log Out</button>
            </li>

          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
