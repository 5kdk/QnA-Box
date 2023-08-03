import { ChangeEvent, useEffect, useState } from 'react';

const useImgFile = (initialImg: string) => {
  const [img, setImg] = useState<Blob | undefined>();
  const [imgBuffer, setImgBuffer] = useState<string | undefined>(initialImg);

  const setNewImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImg(e.target.files[0]);
  };

  useEffect(() => {
    const reader = new FileReader();
    if (img) {
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') setImgBuffer(reader.result);
      };
    } else {
      setImgBuffer(initialImg);
    }
  }, [img, initialImg]);

  return { setNewImg, imgBuffer };
};

export default useImgFile;
