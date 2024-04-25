import { useThree } from '@react-three/fiber';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { REVISION } from 'three';
import { useRef } from 'react';

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;

export const useKTX2Loader = () => {
  const { gl } = useThree();
  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);
  ktx2Loader.detectSupport(gl);

  const loadTexture = (textureUrl, callback) => {
    ktx2Loader.load(textureUrl, (texture) => {
      callback?.(texture);

      // return texture;
    });
  };

  return { ktx2Loader, loadTexture };
};
