import { ChangeEvent, useEffect, useState } from 'react';

const useImgFile = (initialImg: string | null) => {
  const [imgFile, setImgFile] = useState<Blob | undefined>();
  const [imgBuffer, setImgBuffer] = useState<string | undefined | null>(initialImg);

  const setNewImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImgFile(e.target.files[0]);
  };

  useEffect(() => {
    const reader = new FileReader();
    if (imgFile) {
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') setImgBuffer(reader.result);
      };
    } else {
      setImgBuffer(initialImg);
    }
  }, [imgFile, initialImg]);

  return { setNewImg, imgBuffer, imgFile };
};

export default useImgFile;
