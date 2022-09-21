import React from "react";
import { useNavigate, useParams } from "react-router";

import useFecth from "../../Hooks/useFecth";
import { GET_PLAYLIST } from "../../services/api";
import { PlaylistContext } from "../../store/PlaylistContext";

import Header from "./Header";
import Loader from "../../Components/Loader";
import Information from "./Information";
import MusicList from "./MusicList";

import styles from './index.module.css';
import { UserContext } from "../../store/UserContext";
import useInformationPage from "../../Hooks/useInformationPage";

const Playlist = () => {
  const { id } = useParams();
  const { request, data, error, loading } = useFecth();
  const { setDataPlaylist, dataPlaylist } = React.useContext(PlaylistContext);
  const { online } = React.useContext(UserContext);
  const navigate = useNavigate();

  /* Busca as músicas daquela playlist */
  React.useEffect(() => {
    const getMusics = async () => {
      const { url, options } = GET_PLAYLIST(id);
      const { json } = await request(url, options);
      setDataPlaylist(json)
    };
    getMusics();
  }, [id, request, setDataPlaylist]);

  React.useEffect(() => {
    if(!online) navigate('/');
  }, [online, navigate]);

  useInformationPage({
    title: dataPlaylist?.name || 'Sua playlist',
    description: 'Aqui você pode alterar a ordem de uma playlist exclusiva.'
  })

  return (
    <section className={styles.dataPlaylist}>
      {data && error === null && (
        <>
          <Header />
          <Information />
          <MusicList />
        </>
      )}
      {loading && <Loader />}
    </section>
  );
};

export default Playlist;
