import React from "react";

const useMedia = (maxMedia) => {
  const [match, setMacth] = React.useState(false);

  React.useEffect(() => {
    const verificarMacth = () => {
      const { matches } = window.matchMedia(maxMedia);
      setMacth(matches);
    };
    verificarMacth();
    window.addEventListener("resize", verificarMacth);

    return () => {
      window.removeEventListener("resize", verificarMacth);
    };
  }, [maxMedia]);

  return match;
};

export default useMedia;