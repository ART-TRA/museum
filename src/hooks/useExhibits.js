import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useResize } from 'src/hooks/useResize';
import { activeRoomTimes } from 'src/recoil/atoms/activeRoom';

export const EXHIBITS_TIME_COORDS = {
  roomTitle1: activeRoomTimes.same,
  boots: 3.6,
  cups: 7.5,
  bed: 10.35,

  roomTitle2: activeRoomTimes.talents,
  cubes: 16,
  childArt: 19.2,
  xylophone: 22.2,

  roomTitle3: activeRoomTimes.dreams,
  diary: 27.6,
  collage: 29.85,

  roomTitle4: activeRoomTimes.celebrate,
  christmasBall: 36.4,
  bowTie: 38.6,

  roomTitle5: activeRoomTimes.toys,
  storageRoom: 43.75,
  bear: 46.3,
  truck: 49.2,
  doll: 52.2,
  hand: 55,
};

export const useExhibits = () => {
  const { viewport } = useThree();
  const { isDesktop } = useResize();

  const exhibits = {
    boots: {
      name: 'boots',
      cameraTime: EXHIBITS_TIME_COORDS.boots,
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
      cameraTime: EXHIBITS_TIME_COORDS.cups,
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
      cameraTime: EXHIBITS_TIME_COORDS.bed,
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
      cameraTime: EXHIBITS_TIME_COORDS.cubes,
      position: isDesktop
        ? new THREE.Vector3(-0.338 + viewport.width * 0.053, 0.8, 4)
        : new THREE.Vector3(-0.35, 0.8, 4),
      quaternion: new THREE.Quaternion(0, 0, 0, 1),
    },
    art: {
      name: 'art',
      cameraTime: EXHIBITS_TIME_COORDS.childArt,
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
      cameraTime: EXHIBITS_TIME_COORDS.xylophone,
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
      cameraTime: EXHIBITS_TIME_COORDS.diary,
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
      cameraTime: EXHIBITS_TIME_COORDS.collage,
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
      cameraTime: EXHIBITS_TIME_COORDS.christmasBall,
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
      cameraTime: EXHIBITS_TIME_COORDS.bowTie,
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
      cameraTime: EXHIBITS_TIME_COORDS.storageRoom,
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
      cameraTime: EXHIBITS_TIME_COORDS.bear,
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
      cameraTime: EXHIBITS_TIME_COORDS.truck,
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
      cameraTime: EXHIBITS_TIME_COORDS.doll,
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
      cameraTime: EXHIBITS_TIME_COORDS.hand,
      position: isDesktop
        ? new THREE.Vector3(77.4, 2.963, -41.2)
        : new THREE.Vector3(76.5, 2.963, -43.1),
      quaternion: new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.PI * 0.8
      ),
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
