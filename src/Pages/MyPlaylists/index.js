import React from "react";
import ErrorToast from "../../components/ErrorToast";
import Loader from "../../components/Loader";
import useFecth from "../../hooks/useFecth";
import { GET_PLAYLISTS } from "../../services/api";
import { UserContext } from "../../store/UserContext";

import styles from "./index.module.css";
import ItemPlayList from "./ItemPlaylist";

const MyPlaylists = () => {
  const { data, error, loading, request } = useFecth();
  const ctx = React.useContext(UserContext);

  /*Busca as playlist do usuário*/
  React.useEffect(() => {
    const dataPlaylists = async () => {
      const { url, options } = GET_PLAYLISTS(ctx.data.id);
      await request(url, options);
    };
    dataPlaylists();
  }, [ctx.data.id, request]);

  return (
    <section className={styles.sectionHigher}>
      <div className="container">
        <h1 className={styles.titlePlaylist}>Suas playlists</h1>
        <ul className={styles.containerPlaylist}>
          {data &&
            data.items.map(({ id, name, images }) => (
              <ItemPlayList key={id} id={id} name={name} images={images} />
            ))}
        </ul>
      </div>
      {loading && <Loader />}
      <ErrorToast 
        show={error}
        message="Erro ao buscar suas playLists. Tente mais tarde."
      />
    </section>
  )
};

export default MyPlaylists;
