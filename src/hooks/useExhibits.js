import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useResize } from 'src/hooks/useResize';

export const useExhibits = () => {
  const { viewport } = useThree();
  const { isDesktop } = useResize();

  const exhibits = {
    boots: {
      name: 'boots',
      cameraTime: 2.8,
      position: isDesktop
        ? new THREE.Vector3(-26.983 + viewport.width * 0.003, 0.89, -6)
        : new THREE.Vector3(-27.6 + viewport.width * 0.003, 0.89, -5),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0.15, 0),
        -Math.PI * 0.4
      ),
    },
    cups: {
      name: 'cups',
      cameraTime: 8.3,
      position: isDesktop
        ? new THREE.Vector3(-34, 0.93, 7.955)
        : new THREE.Vector3(-33.5, 0.93, 8.4),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.445 - viewport.width * 0.002
      ),
    },
    bed: {
      name: 'bed',
      cameraTime: 13.5,
      position: isDesktop
        ? new THREE.Vector3(-23.25, 0.7, 13.3)
        : new THREE.Vector3(-21.8, 1.2, 10.3),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI
      ),
    },
    cubes: {
      name: 'cubes',
      cameraTime: 23,
      position: isDesktop
        ? new THREE.Vector3(-0.338 + viewport.width * 0.053, 0.8, 4)
        : new THREE.Vector3(-0.35, 0.8, 4),
      quaternion: new THREE.Quaternion(0, 0, 0, 1),
    },
    art: {
      name: 'art',
      cameraTime: 27.3,
      position: isDesktop
        ? new THREE.Vector3(13.8 - viewport.width * 0.051, 1.6, 8)
        : new THREE.Vector3(14.2 - viewport.width * 0.051, 1.6, 7),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI
      ),
    },
    xylophone: {
      name: 'xylophone',
      cameraTime: 32.7,
      position: isDesktop
        ? new THREE.Vector3(24.43 + viewport.width * 0.0015, 1.8, 2)
        : new THREE.Vector3(23.36 + viewport.width * 0.0015, 1.8, 2),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.PI * 0.13
      ),
    },
    diary: {
      name: 'diary',
      cameraTime: 40.5,
      position: isDesktop
        ? new THREE.Vector3(46.665 - viewport.width * 0.0045, 1.45, 31.6)
        : new THREE.Vector3(47.2 - viewport.width * 0.0045, 1.45, 31.3),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.86
      ),
    },
    collage: {
      name: 'collage',
      cameraTime: 44.8,
      position: isDesktop
        ? new THREE.Vector3(64, 1.7, 27.6)
        : new THREE.Vector3(64, 1.7, 26.2),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 1.19
      ),
    },
    bauble: {
      name: 'bauble',
      cameraTime: 54.7,
      position: isDesktop
        ? new THREE.Vector3(59.6, 1.45, 4.2)
        : new THREE.Vector3(60.3, 1.45, 4.2),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.6
      ),
    },
    bowTie: {
      name: 'bowTie',
      cameraTime: 58.5,
      position: isDesktop
        ? new THREE.Vector3(56.7, 1.6, -12.14)
        : new THREE.Vector3(57.1, 1.6, -11.3),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.24
      ),
    },
    storageRoom: {
      name: 'storageRoom',
      cameraTime: 68,
      position: isDesktop
        ? new THREE.Vector3(62.2, 0.56, -41.8)
        : new THREE.Vector3(61.5, 0.56, -41.8),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.1
      ),
    },
    bear: {
      name: 'bear',
      cameraTime: 71.8,
      position: isDesktop
        ? new THREE.Vector3(47.7, 0.96, -39)
        : new THREE.Vector3(47.9, 0.96, -38.77),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.7
      ),
    },
    car: {
      name: 'car',
      cameraTime: 77,
      position: isDesktop
        ? new THREE.Vector3(49.95, 0.5, -56.4)
        : new THREE.Vector3(49.95, 0.5, -55.85),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI * 0.23
      ),
    },
    doll: {
      name: 'doll',
      cameraTime: 81.5,
      position: isDesktop
        ? new THREE.Vector3(66.9, 1.02, -56.4)
        : new THREE.Vector3(66.6, 1.02, -56.45),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.PI * 0.3
      ),
    },
    hand: {
      name: 'hand',
      cameraTime: 83.7,
      position: null,
      quaternion: null,
    },
  };

  const exhibitsDirections = {
    boots: {
      prev: null,
      next: exhibits.cups,
    },
    cups: {
      prev: exhibits.boots,
      next: exhibits.bed,
    },
    bed: {
      prev: exhibits.cups,
      next: exhibits.cubes,
    },
    cubes: {
      prev: exhibits.bed,
      next: exhibits.art,
    },
    art: {
      prev: exhibits.cubes,
      next: exhibits.xylophone,
    },
    xylophone: {
      prev: exhibits.art,
      next: exhibits.diary,
    },
    diary: {
      prev: exhibits.xylophone,
      next: exhibits.collage,
    },
    collage: {
      prev: exhibits.diary,
      next: exhibits.bauble,
    },
    bauble: {
      prev: exhibits.collage,
      next: exhibits.bowTie,
    },
    bowTie: {
      prev: exhibits.bauble,
      next: exhibits.storageRoom,
    },
    storageRoom: {
      prev: exhibits.bowTie,
      next: exhibits.bear,
    },
    bear: {
      prev: exhibits.storageRoom,
      next: exhibits.car,
    },
    car: {
      prev: exhibits.bear,
      next: exhibits.doll,
    },
    doll: {
      prev: exhibits.car,
      next: exhibits.hand,
    },
    hand: {
      prev: exhibits.doll,
      next: null,
    },
  };

  return { exhibits, exhibitsDirections };
};
