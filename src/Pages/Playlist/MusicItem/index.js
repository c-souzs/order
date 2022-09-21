import React from "react";

import { PlaylistContext } from "../../../store/PlaylistContext";

import styles from './index.module.css';

const MusicItem = ({ uri,img, name, singer, limit }) => {
    const {urisOrder, setUrisOrder, editOrder} = React.useContext(PlaylistContext)

    // Ele não substitui a música na ordem correta
    const addUri = () => {
      if(!editOrder) return false;
      
      const includeUri = urisOrder.includes(uri);

      if (!limit && !includeUri) setUrisOrder((u) => [...u, uri]);
      if (includeUri) {
        const newDataOrder = urisOrder.filter(
          (uriItem) => uriItem !== uri
        );
        setUrisOrder(newDataOrder);
      }
    };

    return (
      <div
        key={uri}
        onClick={addUri}
        className={
          urisOrder.includes(uri)
            ? `${styles.addMusic} ${styles.music}`
            : `${styles.music}`
        }
      >
        <img src={img} alt={name} />
        <h4>{name}</h4>
        <p>{singer}</p>
      </div>
    );
};

export default MusicItem;
