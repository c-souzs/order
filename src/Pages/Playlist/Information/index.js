import React from "react";

import { PlaylistContext } from "../../../store/PlaylistContext";

import styles from "./index.module.css";

const Information = () => {
  const { urisOrder, urisSongs, editOrder } = React.useContext(PlaylistContext);
  const [widthProgressBar, setWidthProgressBar] = React.useState(0);

  /* Calcula o tamanho da barra de progesso baseado na quantidade música da playlist e nas músicas adicionada na fila */
  React.useEffect(() => {
    if (urisSongs && urisOrder) {
      const w = (urisOrder.length * 100) / urisSongs.length;
      setWidthProgressBar(w);
    }
  }, [urisOrder, urisSongs]);

  if (!editOrder) return null;
  return (
        <div
          className={styles.progressBar}
          style={{ width: `${widthProgressBar}%` }}
        />
  );
};

export default Information;
