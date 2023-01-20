const { createContext, useContext, useState, useEffect } = require('react');

const ImgContext = createContext();

const ImgProvider = props => {
  const [imgReady, setImgReady] = useState(false);
  const value = { imgReady };

  const [loadingImgReady, setLoadingImgReady] = useState(false);
  const [logoImgReady, setLogoImgReady] = useState(false);
  const [bgImgReady, setBgImgReady] = useState(false);

  useEffect(() => {
    const loadingImg = new Image();
    const logoImg = new Image();
    const bgImg = new Image();
    loadingImg.addEventListener('load', () => setLoadingImgReady(true));
    logoImg.addEventListener('load', () => setLogoImgReady(true));
    bgImg.addEventListener('load', () => setBgImgReady(true));
    loadingImg.src = '/imgs/loading-gif.gif';
    logoImg.src = '/imgs/dog-paw-logo.png';
    bgImg.src = '/imgs/background-dog.jpg';

    return () => {
      loadingImg.removeEventListener('load', () => setLoadingImgReady(true));
      logoImg.removeEventListener('load', () => setLogoImgReady(true));
      bgImg.removeEventListener('load', () => setBgImgReady(true));
    };
  }, []);

  useEffect(() => {
    if (loadingImgReady && logoImgReady && bgImgReady) {
      setImgReady(true);
    }
  }, [loadingImgReady, logoImgReady, bgImgReady]);

  return <ImgContext.Provider value={value} {...props}></ImgContext.Provider>;
};

function useImg() {
  const context = useContext(ImgContext);
  if (typeof context === 'undefined') {
    throw new Error('useImg must be used within ImgContext');
  }
  const { imgReady } = context;
  return { imgReady };
}

export default ImgProvider;
export { useImg };
