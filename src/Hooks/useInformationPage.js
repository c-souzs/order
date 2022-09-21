import React from 'react';

const useInformationPage = (props) => {
  React.useEffect(() => {
    document.title = `Order - ${props.title}`;
    document.querySelector("meta[name='description']")?.setAttribute('content', props.description || '');
  }, [props.title, props.description]);
  
  return null;
};

export default useInformationPage;