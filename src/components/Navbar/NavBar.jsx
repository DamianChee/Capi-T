import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/contract"
                >
                  Contract
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/ships"
                >
                  Ships
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/map"
                >
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/shipyard"
                >
                  Shipyard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                  to="/market"
                >
                  Market
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
