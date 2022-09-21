import React from "react";
import { Link } from "react-router-dom";
import useMedia from "../../../Hooks/useMedia";

import styles from "./index.module.css";

const ItemPlayList = ({ id, name, images }) => {
  const mobile = useMedia('(max-width: 600px)');
  
  return (
    <li
      className={styles.playlist}
    >
      <Link to={`/playlist/${id}`} className={styles.containerLink}>
        <h3 className={styles.namePlaylist}>{mobile ? name : `${name.split(' ')[0]} ...`}</h3>
        <img src={images[0].url} alt={name} className={styles.bannerPlaylist}/>
      </Link>
    </li>
  );
};

export default ItemPlayList;
