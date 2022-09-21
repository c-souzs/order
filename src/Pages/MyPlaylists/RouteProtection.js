import React from "react";
import { Navigate } from "react-router";

import { UserContext } from "../../store/UserContext";

import MyPlaylists from ".";

const RouteProtection = () => {
  const { online } = React.useContext(UserContext);
  
  if (online) return <MyPlaylists />;
  else if (online === false) return <Navigate to="/" />;
  else return null;
};

export default RouteProtection;
