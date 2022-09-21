import React from "react";
import { useNavigate } from "react-router";

import useFecth from "../../../Hooks/useFecth";
import { PUT_ORDER_PLAYLIST } from "../../../services/api";
import { PlaylistContext } from "../../../store/PlaylistContext";

import ErrorToast from "../../../Components/ErrorToast";
import Loader from "../../../Components/Loader";

import styles from "./index.module.css";

const Header = () => {
  const { request, error, loading } = useFecth();

  /* Arrumar o bug do toast de sucesso ao orderna a playlist */
  const [sucess, setSucess] = React.useState(null);

  const [title, setTitle] = React.useState('');
  const navigate = useNavigate();
  const { dataPlaylist, editOrder, setEditOrder, urisSongs, urisOrder, setUrisOrder } =
  React.useContext(PlaylistContext);

  /* Organiza os dados da playlist e faz a requisição para atualizar */
  const saveOrder = async () => {
    const songsNoOrder = urisSongs.filter((song) => !urisOrder.includes(song));
    const urisString = urisOrder.concat(songsNoOrder).join(",");
    const idPlaylist = dataPlaylist.id;
    const body = {
      range_start: 0,
      insert_before: urisSongs.lenght,
    };

    const { url, options } = PUT_ORDER_PLAYLIST(idPlaylist, urisString, body);
    const {response} = await request(url, options);
    setSucess(response.ok);
    navigate("/my-playlists");
  };

  /* Um botão, duas funcionalidades. Aciona a função que permite selecionar as músicas para alterar e finaliza a alteração */
  const actionButton = async () => {
    if (editOrder) {
      await saveOrder();
      setEditOrder(false);
    } else {
      setEditOrder(true);
    }
  };

  /* Cancela as alterações e limpa os dados do contexto */
  const cancelOrder = () => {
    setEditOrder(false);
    setUrisOrder([]);
  }

  /* Altera o título para direcionar o usuário na alteração */
  React.useEffect(() => {
    if(urisOrder && urisSongs){
      if(!urisOrder.length) setTitle('Ordene sua playlist.')
      else if(urisOrder.length === urisSongs.length) setTitle(`Finalize a ordenação`)
      else setTitle(`Adicione a ${urisOrder.length + 1}º música`);
    }
  }, [urisOrder, urisSongs]);

  return (
    <header>
      <div className={`container ${styles.containerHeaderPlaylist}`}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.controls}>
          <button
            disabled={urisOrder.length > 0 || !editOrder ? false : true}
            className={styles.buttonOrder}
            onClick={actionButton}
          >
            {editOrder ? "Finalizar" : "Ordenar"}
          </button>
          {editOrder && (
            <button
              className={styles.buttonCancel}
              onClick={cancelOrder}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      <ErrorToast 
        show={error}
        message='Não foi possível altera sua playlist. Tente mais tarde.'
      />
      {loading && <Loader />}
    </header>
  );
};

export default Header;
