import { useEffect, useState } from 'react';

const useImgFile = (initialImg: string) => {
  const [newImg, setNewImg] = useState<Blob | undefined>();
  const [newImgBuffer, setNewImgBuffer] = useState<string | undefined>(initialImg);

  useEffect(() => {
    const reader = new FileReader();
    if (newImg) {
      reader.readAsDataURL(newImg);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') setNewImgBuffer(reader.result);
      };
    } else {
      setNewImgBuffer(initialImg);
    }
  }, [newImg, initialImg]);

  return { setNewImg, newImgBuffer };
};

export default useImgFile;
