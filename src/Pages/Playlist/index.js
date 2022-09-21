import React from "react";
import { useNavigate, useParams } from "react-router";

import useFecth from "../../hooks/useFecth";
import { GET_PLAYLIST } from "../../services/api";
import { PlaylistContext } from "../../store/PlaylistContext";

import Header from "./Header";
import Loader from "../../components/Loader";
import Information from "./Information";
import MusicList from "./MusicList";

import styles from './index.module.css';
import { UserContext } from "../../store/UserContext";

const Playlist = () => {
  const { id } = useParams();
  const { request, data, error, loading } = useFecth();
  const { setDataPlaylist } = React.useContext(PlaylistContext);
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
