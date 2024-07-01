import { useThree } from '@react-three/fiber';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { REVISION } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshoptDecoder } from 'three-stdlib';

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;

export const useKTX2Loader = () => {
  const { gl } = useThree();
  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);
  ktx2Loader.detectSupport(gl);

  const loadTexture = (textureUrl, callback) => {
    ktx2Loader.load(textureUrl, (texture) => {
      callback?.(texture);
    });
  };

  const loadModel = (callback) => {
    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('models/shapes.gltf', (model) => {
      callback?.(model);
    });
  };

  return { ktx2Loader, loadTexture, loadModel };
};
