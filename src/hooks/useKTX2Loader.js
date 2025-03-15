import { useThree } from '@react-three/fiber';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { REVISION } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshoptDecoder } from 'three-stdlib';

export const useKTX2Loader = () => {
  const { gl } = useThree();
  const ktx2Loader = new KTX2Loader();
  // const basisPath = `https://cdn.jsdelivr.net/npm/three@0.${THREE.REVISION}.x/examples/jsm/libs/basis/`;
  const basisPath = '/libs/basis/';
  ktx2Loader.setTranscoderPath(basisPath);
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
