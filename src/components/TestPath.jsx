import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const CURVE_PATH = [
  new THREE.Vector3(-17.0, 1.4, -1.6),
  new THREE.Vector3(-26, 1.4, -3.5), // 1+
  new THREE.Vector3(-33, 1.4, -1.4),
  new THREE.Vector3(-32, 1.4, 7), // 3+
  new THREE.Vector3(-30, 1.4, 12),
  new THREE.Vector3(-22.0, 1.4, 12.16), // 5+
  new THREE.Vector3(-1.77, 1.4, 21.5),
  new THREE.Vector3(-0.34, 1.4, 5.5), // 7+
  new THREE.Vector3(13.88, 1.4, 5.5),
  new THREE.Vector3(22.71, 1.4, 4.62),
  new THREE.Vector3(33.78, 1.4, 2.14),
  new THREE.Vector3(48.31, 1.4, 26.3),
  new THREE.Vector3(61.34, 1.4, 23.63),
  new THREE.Vector3(70.02, 1.4, 16.35),
  new THREE.Vector3(75.89, 1.4, 4.38),
  new THREE.Vector3(62.88, 1.4, 2.15),
  new THREE.Vector3(60.07, 1.4, -10.11),
  new THREE.Vector3(69.94, 1.4, -18.98),
  new THREE.Vector3(63.37, 1.4, -37.44),
  new THREE.Vector3(49.42, 1.4, -40.62),
  new THREE.Vector3(49.51, 1.4, -53.64),
  new THREE.Vector3(64.57, 1.4, -55.82),
  new THREE.Vector3(74.25, 1.4, -43.71),
];

const LOOK_AT = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-26.3, 1, -8.1), // 1+
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-36, 1, 8.2), // 3+
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-22.0, 1, 19.16), // 5+
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-0.34, 1, -0.5), //7+
];

const ALLOW_INDEX = [1, 3, 5, 7];

const CURVE_PATH_TEST = [
  new THREE.Vector3(1, 0, 1),
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(3, 2, 3),
  new THREE.Vector3(3, 4, 1),
  new THREE.Vector3(0, 7, 4),
  new THREE.Vector3(5, 5, 8),
  new THREE.Vector3(0, -1, 5),
  new THREE.Vector3(1, 0, 1),
];
const FRICTION_DISTANCE = 2.6;
const DURATION = 12;

const allow = true;

export const TestPath = () => {
  const tubeRef = useRef();
  const timer = useRef(0);
  const curve = useRef(new THREE.CatmullRomCurve3(CURVE_PATH));

  const onWheel = (event) => {
    console.log(event);
    if (event.deltaY > 0) {
      timer.current += 0.0003;
    } else {
      timer.current -= 0.0003;
    }
  };

  useLayoutEffect(() => {
    if (allow) {
      document.addEventListener('wheel', onWheel);

      return () => {
        document.removeEventListener('wheel', onWheel);
      };
    }
  }, []);

  useFrame((state, delta) => {
    if (allow) {
      let friction = 1; // коэф замедления

      const t = timer.current % 1;
      const t2 = (timer.current + 0.002) % 1;

      const tubePath = tubeRef.current.geometry.parameters;
      const pos = tubePath.path.getPointAt(t);
      const pos2 = tubePath.path.getPointAt(t2);

      state.camera.position.lerp(pos, delta);
      state.camera.lookAt(pos2);

      // const currentLookAt = state.camera.getWorldDirection(new THREE.Vector3());
      // const targetLookAt = new THREE.Vector3()
      //   .subVectors(pos2, pos)
      //   .normalize();
      // const lookAt = currentLookAt.lerp(targetLookAt, delta);
      //
      // // замедление на контр точках
      // CURVE_PATH.forEach((coord, index) => {
      //   const cameraDistance = coord.distanceTo(state.camera.position);
      //   if (cameraDistance <= FRICTION_DISTANCE) {
      //     // console.log('i', index, cameraDistance);
      //     if (index > 0) {
      //       friction = Math.max(cameraDistance / FRICTION_DISTANCE, 0.02);
      //     }
      //     if (index > 0 && index < 8 && index % 2 !== 0) {
      //       state.camera.rotation.y -= Math.PI * 0.5;
      //       // const targetLookAtPoint = new THREE.Vector3()
      //       //   .subVectors(LOOK_AT[index], pos)
      //       //   .normalize();
      //       // const lookAtPoint = currentLookAt.lerp(targetLookAtPoint, delta);
      //       // state.camera.lookAt(state.camera.position.clone().add(lookAtPoint));
      //     }
      //   } else {
      //     state.camera.lookAt(state.camera.position.clone().add(lookAt));
      //   }
      // });
      //
      // state.camera.position.lerp(pos, delta * friction);
    }
  });

  return (
    <group>
      <axesHelper args={[5]} />
      {CURVE_PATH.map((coord, index) => (
        <mesh position={coord} key={index} visible={true}>
          <sphereGeometry args={[2.6, 16, 16]} />
          <meshStandardMaterial color={'#ff0000'} wireframe={true} />
        </mesh>
      ))}
      <mesh ref={tubeRef} visible={true}>
        <tubeGeometry args={[curve.current, 2048, 0.5, 8, false]} />
        <meshStandardMaterial
          color={'#999999'}
          side={THREE.DoubleSide}
          wireframe={true}
        />
      </mesh>
    </group>
  );
};
