import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import gsap from 'gsap';

export const StartTitle = ({ activeScreen, setActiveScreen }) => {
  const titleRef = useRef();
  const materialRef = useRef();
  const tempFigure = useRef(null);
  const tempFigure2 = useRef(null);
  const firstScroll = useRef(0);

  const onScroll = () => {
    if (activeScreen === 'title' && firstScroll.current < 2) {
      console.log('SCROLL TITLE');
      firstScroll.current += 1;
      tempFigure.current.material.transparent = true;
      tempFigure2.current.material.transparent = true;
      tempFigure.current.material.opacity = 0;
      tempFigure2.current.material.opacity = 0;
      titleRef.current.material.transparent = true;
      gsap.to(titleRef.current.material, {
        // opacity: 0,
        roughness: 0,
        reflectivity: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        onStart: () => {
          // materialRef.current.transparent = true;
          gsap.to(titleRef.current.position, {
            z: 20,
            duration: 2,
            ease: 'power2.inOut',
          });
          titleRef.current.children.forEach((child) => {
            child.material.transparent = true;
            gsap.to(child.material, {
              opacity: 0,
              duration: 1,
            });
          });
        },
        onUpdate: () => {
          console.log('UU', titleRef.current.material.opacity);
        },
        onComplete: () => {
          setTimeout(() => {
            // titleRef.current.position.set(0, 0, 20);
            setActiveScreen('figures');
          }, 1400);
        },
      });
    }
  };

  return (
    <mesh
      ref={titleRef}
      position={[0, 0.6, 4]}
      onWheel={onScroll}
      onClick={(event) => event.stopPropagation()}
      onPointerEnter={(event) => event.stopPropagation()}
    >
      <planeGeometry args={[16, 11]} />
      <meshPhysicalMaterial
        ref={materialRef}
        transparent={false}
        opacity={0}
        color={'#fff'}
        transmission={1}
        roughness={0.57}
        thickness={1.0}
        clearcoat={0.9}
        clearcoatRoughness={1.0}
        reflectivity={0.99}
        specularIntensity={0.0}
      />
      <Text
        maxWidth={6}
        textAlign="center"
        // whiteSpace="overflowWrap"
        position={[0, 0.8, 0.1]}
        // rotation={item.rotation}
        anchorX="center"
        anchorY="middle"
        color="#4c4c4c"
        // key={item.key}
        font={'/fonts/AmaticSC/AmaticSCBold.woff'}
        fontSize={0.9}
        lineHeight={1}
        children={'МУЗЕЙ ПОСЛЕДНЕГО ДЕТСКОГО ДОМА'}
      />
      <Text
        maxWidth={5}
        textAlign="center"
        // whiteSpace="overflowWrap"
        position={[0, -1, 0.1]}
        // rotation={item.rotation}
        anchorX="center"
        anchorY="middle"
        color="#4c4c4c"
        // key={item.key}
        font={'/fonts/Inter/Inter-Regular.woff'}
        fontSize={0.2}
        lineHeight={1.5}
        children={
          'Добро пожаловать в будущее, где все детские дома исчезли, а дети вернулись в родную семью или нашли приёмных родителей.'
        }
      />
      <mesh
        ref={tempFigure}
        position={[-3.4, -0.1, -1.4]}
        rotation={[0, Math.PI * 0.3, Math.PI * 0.2]}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color={'#b0b0b0'} />
      </mesh>
      <mesh
        ref={tempFigure2}
        position={[2.6, -0.5, -1]}
        rotation={[0, 0, Math.PI * 0.2]}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color={'#b0b0b0'} />
      </mesh>
    </mesh>
  );
};
