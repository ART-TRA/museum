import React, { useRef } from 'react';
import { Text, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { useResize } from 'src/hooks/useResize';
import { useAudio } from 'src/hooks/useAudio';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useFrame } from '@react-three/fiber';

const RectangleRoundedGeometry = (w, h, r, s) => {
  // width, height, radiusCorner, smoothness
  function contour(j) {
    qu = Math.trunc((4 * j) / n) + 1; // quadrant  qu: 1..4
    sgx = qu === 1 || qu === 4 ? 1 : -1; // signum left/right
    sgy = qu < 3 ? 1 : -1; // signum  top / bottom
    x = sgx * (w / 2 - r) + r * Math.cos((pi2 * (j - qu + 1)) / (n - 4)); // corner center + circle
    y = sgy * (h / 2 - r) + r * Math.sin((pi2 * (j - qu + 1)) / (n - 4));

    positions.push(x, y, 0);
    uvs.push(0.5 + x / w, 0.5 + y / h);
  }

  const pi2 = Math.PI * 2;
  const n = (s + 1) * 4; // number of segments
  let indices = [];
  let positions = [];
  let uvs = [];
  let qu, sgx, sgy, x, y;

  for (let j = 1; j < n + 1; j++) indices.push(0, j, j + 1); // 0 is center
  indices.push(0, n, 1);
  positions.push(0, 0, 0); // rectangle center
  uvs.push(0.5, 0.5);
  for (let j = 0; j < n; j++) contour(j);

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.setAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );

  return geometry;
};

export const Title = () => {
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const { isDesktop } = useResize();
  const titleRef = useRef();
  const titleWrapRef = useRef();
  const texturePlaneRef = useRef();
  const texturePlaneBackRef = useRef();
  const buttonRef = useRef();
  const startTitleMap = useTexture('/images/startTitle.jpg');
  const hovered = useRef(false);
  const buttonMaterial = useRef(
    new THREE.MeshBasicMaterial({ color: '#4c4c4c' })
  );
  const { playAmbientAudio } = useAudio();

  const onButtonHover = (event, type) => {
    event.stopPropagation();
    if (!hovered.current && type === 'over') {
      hovered.current = true;
      document.body.style.cursor = 'pointer';
    } else if (hovered.current && type === 'out') {
      hovered.current = false;
      document.body.style.cursor = 'auto';
    }
  };

  const onEnterFigures = (event) => {
    event.stopPropagation();
    if (activeScreen === 'title') {
      playAmbientAudio();
      gsap.to(titleRef.current.material, {
        opacity: 0,
        // transparency: 1,
        // roughness: 0,
        // reflectivity: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        onStart: () => {
          buttonRef.current.visible = false;
          const button = document.querySelector('.title-screen__button');
          button?.classList.add('title-screen__button--faded');
          window.dispatchEvent(new CustomEvent('translateFigures'));
          gsap.to(texturePlaneRef.current.material, {
            opacity: 0,
            duration: 0.7,
            ease: 'power4.inOut',
          });
          gsap.to(texturePlaneBackRef.current.material, {
            opacity: 0,
            duration: 0.7,
            ease: 'power4.inOut',
          });
          titleRef.current.children.forEach((child) => {
            if (child.isMesh) {
              child.material.transparent = true;
              gsap.to(child.material, {
                opacity: 0,
                duration: 1,
              });
            }
          });
          setTimeout(() => {
            setActiveScreen('figures');
          }, 600);
        },
        onComplete: () => {
          setTimeout(() => {
            titleRef.current.position.set(0, 0, 20);
          }, 1400);
        },
      });
    }
  };

  useFrame(() => {
    titleWrapRef.current.visible = activeScreen !== 'room';
  });

  return (
    <group
      position={[0, 0.5, 0]}
      ref={titleWrapRef}
      onPointerOver={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <mesh ref={titleRef} position={[0, 0.6, 4]}>
        <Text
          maxWidth={isDesktop ? 6 : 4}
          textAlign="center"
          // whiteSpace="overflowWrap"
          position={[0, 0.8, 0.2]}
          // rotation={item.rotation}
          anchorX="center"
          anchorY="middle"
          color="#4c4c4c"
          // key={item.key}
          font={'/fonts/AmaticSC/AmaticSCBold.woff'}
          fontSize={isDesktop ? 0.9 : 0.6}
          lineHeight={1}
          children={'МУЗЕЙ ПОСЛЕДНЕГО ДЕТСКОГО ДОМА'}
        />
        <Text
          maxWidth={isDesktop ? 4.5 : 3.5}
          textAlign="center"
          // whiteSpace="overflowWrap"
          position={isDesktop ? [0, -1, 0.2] : [0, -0.8, 0.2]}
          // rotation={item.rotation}
          anchorX="center"
          anchorY="middle"
          color="#4c4c4c"
          // key={item.key}
          font={'/fonts/Inter/Inter-Regular.woff'}
          fontSize={0.17}
          lineHeight={1.5}
          children={
            'Добро пожаловать в будущее, где все детские дома исчезли, а дети вернулись в родную семью или нашли приёмных родителей.'
          }
        />
        <group
          ref={buttonRef}
          name="button-enter-to-figures"
          position={[0, -2.1, 0.2]}
          onPointerEnter={(event) => onButtonHover(event, 'over')}
          onPointerOut={(event) => onButtonHover(event, 'out')}
          onClick={onEnterFigures}
        >
          <mesh position={[-0.465, 0, 0]} material={buttonMaterial.current}>
            <circleGeometry args={[0.255, 64]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={buttonMaterial.current}>
            <planeGeometry args={[0.98, 0.51]} />
          </mesh>
          <mesh position={[0.465, 0, 0]} material={buttonMaterial.current}>
            <circleGeometry args={[0.255, 64]} />
          </mesh>
          <Text
            maxWidth={2.4}
            textAlign="center"
            // whiteSpace="overflowWrap"
            position={[0, 0, 0.05]}
            // rotation={item.rotation}
            anchorX="center"
            anchorY="middle"
            color="#fff"
            font={'/fonts/Inter/Inter-Regular.woff'}
            fontSize={0.17}
            lineHeight={1}
            children={'НАЧАТЬ'}
          />
        </group>
      </mesh>
      <mesh ref={texturePlaneBackRef} position={[0, 0, 3.2]}>
        <planeGeometry args={[18, 14]} />
        <meshBasicMaterial
          color={'#fff'}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
      <mesh
        ref={texturePlaneRef}
        position={isDesktop ? [0, 0, 3.3] : [0, 0.7, 3.3]}
        name="blur_figures"
      >
        <planeGeometry args={isDesktop ? [11, 7] : [6.2, 4]} />
        <meshBasicMaterial
          color={'#fff'}
          map={startTitleMap}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
