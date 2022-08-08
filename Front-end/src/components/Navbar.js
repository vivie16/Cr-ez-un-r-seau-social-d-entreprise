import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink  to="/">
            <img src="./img/icon-navbar.PNG" alt="icon" />
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li>
              <NavLink to='/'  >
                <img src="./img/icons/home.svg" alt="home"/>
              </NavLink>
            </li>
            <li>
              <NavLink  to="/profil">
                <img src={userData.picture} alt="user-pic" />
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;