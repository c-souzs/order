import React from "react";

import useFecth from "../../../hooks/useFecth";
import { GET_MUSICS } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";

import Loader from "../../../components/Loader";
import MusicItem from "../MusicItem";

import styles from "./index.module.css";
import ErrorToast from "../../../components/ErrorToast";
import useInformationPage from "../../../hooks/useInformationPage";

const MusicList = () => {
    const { request, data, loading, error } = useFecth();
    const { setUrisSongs, dataPlaylist, editOrder, urisOrder, urisSongs } =
    React.useContext(PlaylistContext);

    const ids = dataPlaylist.tracks.items.map((music) => music.track.id);
    const idsString = ids.join(",");

    const [information, setInformation] = React.useState(null);
    const [limit, setLimit] = React.useState(false);

    /* Busca as músicas da playlist */
    React.useEffect(() => {
      const getMusics = async () => {
        const { url, options } = GET_MUSICS(idsString);
        const { json } = await request(url, options);
        const uris = json.tracks.map((music) => music.uri);
        setUrisSongs(uris);
      };
      getMusics();
    }, [idsString, request, setUrisSongs]);

    /* Baseado no status da ordenação é alterado a frase para orientar o usuário */
    React.useEffect(() => {
      if(urisSongs && urisOrder){
        if(!urisOrder.length) setInformation('Lembre-se, é necessário alterar pelo menos uma música antes de finalizar.')
        else if(urisOrder.length === urisSongs.length) {
          setInformation(`Todas as músicas foram posicionadas. Finalize a alteração ou cancele.`);
          setLimit(true);
        }
        else setInformation(`Lembre-se, músicas já posicionadas apresentam um brilho menor, para remove-lá da lista basta clicar novamente.`);
      }
    }, [urisSongs, urisOrder]);

    return (
      <div
        className={`${styles.customContainer} ${
          editOrder ? styles.edit : styles.noEdit
        }`}
      >
        <p className={styles.alertInformation}>{information}</p>
        {data && data.tracks.map((music) => {
          const singer = music.artists[0].name;
          const img = music.album.images[0].url;
          const nameMusic = music.name;
          return (
            <MusicItem
              key={music.id}
              uri={music.uri}
              img={img}
              name={nameMusic}
              singer={singer}
              limit={limit}
            />
          );
        })}
        {loading && <Loader />}
        <ErrorToast 
          show={error}
          message='Erro ao buscar as músicas dessa playlist. Tente mais tarde.'
        />
      </div>
    );
};

export default MusicList;
