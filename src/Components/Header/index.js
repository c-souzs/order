import React from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../store/UserContext";

import logo from "../../assets/logo.svg";

import styles from "./index.module.css";

const Header = () => {
  const { online, data } = React.useContext(UserContext);

  if(!online) return null
  else return (
    <header className={styles.header}>
      <div className={`container ${styles.containerHeader}`}>
        <Link to='/my-playlists'> <img src={logo} alt="Logo" /> </Link>
        <h3 className={styles.welcome}>Bem vindo, {data.display_name} !</h3>
      </div>
    </header>
  );
};

export default Header;
