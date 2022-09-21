import React from "react";
import { useNavigate } from "react-router";

import useFecth from "../hooks/useFecth";
import { GET_USER } from "../services/api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [online, setOnline] = React.useState(false);

  const { request, error, loading } = useFecth();
  const navigate = useNavigate();

  const logar = async () => {
    const {url, options} = GET_USER();
    const {response, json} = await request(url, options);

    if(response.ok) {
      setData(json);
      setOnline(true);
      navigate('/my-playlists');
    } else {
      localStorage.clear();
    }
  }

  return <UserContext.Provider value={{logar, online, data, error, loading}}>{children}</UserContext.Provider>;
};
