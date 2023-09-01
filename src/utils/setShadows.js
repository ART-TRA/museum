import { Mesh } from 'three';
import * as THREE from 'three';

export const setShadows = (obj) => {
  if (obj) {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.side = THREE.FrontSide;
      }
    });
  }
};
