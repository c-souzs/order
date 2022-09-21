import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import RouteProtection from "./pages/MyPlaylists/RouteProtection";
import Playlist from "./pages/Playlist";
import { PlaylistStorage } from "./store/PlaylistContext";
import { UserContext } from "./store/UserContext";

function App() {
  const { hash } = window.location;
  const { logar } = React.useContext(UserContext);

  /* Salva no local storage informações para o login do usuário */
  const saveToken = (paramsInUrl) => {
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    const { access_token, expires_in, token_type } = paramsSplitUp;

    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
  };

  /* Verifica se tem alguma informação útil no local storage*/
  const checkTokenLocalStorage = React.useCallback(() => {
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');
    const expiresIn = localStorage.getItem('expiresIn');

    return tokenType && accessToken && expiresIn ? true : false;
  }, []);

  /* Verifica se tem alguma informação útil para o login na url */
  const checkTokenUrl = React.useCallback(() => {
    const stringAfterHashtag = hash.substring(1);
    const params = stringAfterHashtag.split("&");
  
    const haveToken = hash.includes("access_token");
  
    if (haveToken) {
      saveToken(params);
      return true;
    } else {
      return false;
    }
  }, [hash]);

  /* 
    Monitora a url do site, caso tenha alguma mudança ele verifica as informações necessária e faz o login 
    Responsável por fazer o login automático

    Problema de loop nas dependências
  */  
  React.useEffect(() => {
    if(checkTokenUrl() || checkTokenLocalStorage()) logar();
  }, [hash]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/my-playlists" element={<RouteProtection />} />
        <Route path="/playlist/:id" element={
          <PlaylistStorage>
            <Playlist />
          </PlaylistStorage>
        }/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
