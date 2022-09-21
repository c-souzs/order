import React from "react";

import useFecth from "../../Hooks/useFecth";
import useInformationPage from "../../Hooks/useInformationPage";
import { GET_PLAYLISTS } from "../../services/api";
import { UserContext } from "../../store/UserContext";

import ErrorToast from "../../Components/ErrorToast";
import Loader from "../../Components/Loader";
import ItemPlayList from "./ItemPlaylist";

import styles from "./index.module.css";

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

  useInformationPage({
    title: 'Minhas Playlists',
    description: 'Veja suas playlists, altere como e quando quiser.'
  });

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
