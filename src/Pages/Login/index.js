import React from "react";

import { REDIRECT_URL_TOKEN } from "../../services/api";
import { UserContext } from "../../store/UserContext";

import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";

import logo from "../../assets/logo.svg";
import iconButton from "../../assets/icon-button.svg";

import styles from "./index.module.css";
import useInformationPage from "../../hooks/useInformationPage";

const Login = () => {
    const { error, loading } = React.useContext(UserContext);

    useInformationPage({
      title: 'Login',
      description: 'Faça seu login com o spotify e alterar as músicas de suas playlists como quiser'
    });

    return (
      <>
        <section className={styles.login}>
          <div className={styles.content}>
            <img src={logo} alt="Logo order"/>
            <p className={styles.phrase}>Organize suas músicas como preferir. </p>
            <button onClick={REDIRECT_URL_TOKEN}>
              <img src={iconButton} alt="Icon sign in" />
              Sign In
            </button>
          </div>
          {loading && <Loader />}
          <ErrorToast show={error} type='error' message='Erro ao realizar o login. Tente mais tarde.'/>
        </section>
      </>
    );
};

export default Login;
