import React, { useEffect, useRef } from 'react';
import { Text, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { useResize } from 'src/hooks/useResize';
import { useAudio } from 'src/hooks/useAudio';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useFrame, useThree } from '@react-three/fiber';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';

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
  const { progress } = useProgress();
  const { isDesktop } = useResize();
  const titleRef = useRef();
  const titleWrapRef = useRef();
  const texturePlaneRef = useRef();
  const texturePlaneBackRef = useRef();
  const buttonRef = useRef();
  const buttonTextRef = useRef();
  const { loadTexture } = useKTX2Loader();
  const { gl } = useThree();
  const hovered = useRef(false);
  const buttonMaterial = useRef(
    new THREE.MeshBasicMaterial({ color: '#4a5468' })
  );
  const { playAmbientAudio } = useAudio();

  const onButtonHover = (event, type) => {
    event.stopPropagation();
    if (type === 'over') {
      console.log('over', buttonRef.current?.scale);
      gsap.to(buttonRef.current?.scale, {
        x: 1.12,
        y: 1.12,
        duration: 0.5,
        // ease: 'elastic.out(0.3, 0.1)',
        ease: 'power4.out',
      });
      document.body.style.cursor = 'pointer';
    } else if (type === 'out') {
      console.log('out');
      hovered.current = false;
      document.body.style.cursor = 'auto';
      gsap.to(buttonRef.current?.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.5,
        // ease: 'elastic.out(0.3, 0.1)',
        ease: 'power4.out',
      });
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
            titleRef.current?.position.set(0, 0, 20);
          }, 1400);
        },
      });
    }
  };

  useEffect(() => {
    if (titleRef.current && progress >= 100) {
      gsap.delayedCall(1.1, () => {
        gsap.to(titleRef.current.position, {
          y: 0.6,
          z: 4,
          duration: 2.0,
          ease: 'power4.inOut',
        });
      });
    }
  }, [progress]);

  useEffect(() => {
    loadTexture('/textures/title/startTitle.ktx2', (texture) => {
      gl.initTexture(texture);
      texturePlaneRef.current.material = new THREE.MeshBasicMaterial({
        color: '#fff',
        map: texture,
        transparent: true,
        opacity: 0.6,
        toneMapped: false,
        side: THREE.BackSide,
      });
    });
  }, []);

  useFrame((state, delta) => {
    titleWrapRef.current.visible = activeScreen !== 'room';

    // texturePlaneRef.current.rotation.set(
    //   -Math.PI * state.pointer.y * 0.1,
    //   Math.PI * state.pointer.x * 0.2,
    //   0
    // );
  });

  return (
    <group
      position={[0, 0.5, 0]}
      ref={titleWrapRef}
      onPointerEnter={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      dispose={null}
    >
      <mesh ref={titleRef} position={[0, 1, 14]}>
        <Text
          maxWidth={isDesktop ? 6 : 4}
          textAlign="center"
          // whiteSpace="overflowWrap"
          position={[0, 0.8, 0.2]}
          // rotation={item.rotation}
          anchorX="center"
          anchorY="middle"
          color="#4a5468"
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
          position={[0, -0.8, 0.2]}
          // rotation={item.rotation}
          anchorX="center"
          anchorY="middle"
          color="#4a5468"
          // key={item.key}
          font={'/fonts/Inter/Inter-Regular.woff'}
          fontSize={0.17}
          lineHeight={1.5}
          children={
            'Добро пожаловать в будущее, где все детские дома исчезли, а дети вернулись в родную семью или нашли приёмных родителей.'
          }
        />
        <mesh
          position={[0, -1.875, 0.3]}
          geometry={new THREE.PlaneGeometry(1.3, 0.51)}
          material={
            new THREE.MeshBasicMaterial({
              color: '#1ff1ff',
              transparent: true,
              opacity: 0,
            })
          }
          onPointerEnter={(event) => onButtonHover(event, 'over')}
          onPointerOut={(event) => onButtonHover(event, 'out')}
          onClick={onEnterFigures}
        />
        <mesh
          ref={buttonRef}
          name="button-enter-to-figures"
          position={[0, -1.9, 0.2]}
          // geometry={RectangleRoundedGeometry(1.44, 0.51, 0.25, 10)}
          // material={buttonMaterial.current}
        >
          <mesh
            onPointerEnter={(event) => {
              event.stopPropagation();
            }}
            position={[-0.4, 0, 0]}
            material={buttonMaterial.current}
          >
            <circleGeometry args={[0.255, 64]} />
          </mesh>
          <mesh
            onPointerEnter={(event) => {
              event.stopPropagation();
            }}
            position={[0, 0, 0]}
            material={buttonMaterial.current}
          >
            <planeGeometry args={[0.8, 0.51]} />
          </mesh>
          <mesh
            onPointerEnter={(event) => {
              event.stopPropagation();
            }}
            position={[0.4, 0, 0]}
            material={buttonMaterial.current}
          >
            <circleGeometry args={[0.255, 64]} />
          </mesh>
          <Text
            ref={buttonTextRef}
            onPointerEnter={(event) => {
              event.stopPropagation();
            }}
            maxWidth={2.4}
            textAlign="center"
            // whiteSpace="overflowWrap"
            position={[0, 0, 0.05]}
            // rotation={item.rotation}
            anchorX="center"
            anchorY="middle"
            // color="#fff"
            font={'/fonts/Inter/Inter-Regular.woff'}
            fontSize={0.15}
            // letterSpacing={0.03}
            lineHeight={1}
            children={'НАЧАТЬ'}
            material={
              new THREE.MeshBasicMaterial({ color: '#fff', toneMapped: false })
            }
          />
        </mesh>
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
        rotation={[Math.PI, 0, 0]}
        position={isDesktop ? [0, 0, 3.3] : [0, 0.7, 3.3]}
        name="blur_figures"
      >
        <planeGeometry args={isDesktop ? [11, 7] : [6.2, 4]} />
      </mesh>
    </group>
  );
};
