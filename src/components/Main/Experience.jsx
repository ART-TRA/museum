import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { PerspectiveCamera, useFBO, useGLTF } from '@react-three/drei';
import { HomeScreen } from 'src/components/HomeScreen';
import { useTextures } from 'src/hooks/useTextures';
import { Level } from 'src/components/Room/Level';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';

export const Experience = () => {
  const activeScreen = useRecoilValue(activeScreenAtom);
  const roomModel = useGLTF('models/model.glb');
  const homeModel = useGLTF('models/figures.glb');
  const roomTextures = useTextures();

  // const { viewport } = useThree();
  // const renderTarget = useFBO();
  // const renderTarget2 = useFBO();
  const renderFigures = useRef();
  const renderRoom = useRef();
  // const renderMaterial = useRef();
  // const renderCamera = useRef();

  useFrame(({ gl, scene }) => {
    renderFigures.current.visible = activeScreen !== 'room';
    renderRoom.current.visible = activeScreen === 'room';

    // gl.setRenderTarget(renderTarget);
    // gl.render(scene, renderCamera.current);
    //
    // gl.setRenderTarget(renderTarget2);
    // renderFigures.current.visible = false;
    // renderRoom.current.visible = true;
    // gl.render(scene, renderCamera.current);
  });

  // return (
  //   <>
  //     <PerspectiveCamera near={0.5} ref={renderCamera} />
  //     <mesh>
  //       <planeGeometry args={[viewport.width, viewport.height]} />
  //       <transitionMaterial
  //         ref={renderMaterial}
  //         uTexture={renderTarget.texture}
  //         uTexture2={renderTarget2.texture}
  //         toneMapped={false}
  //       />
  //     </mesh>
  //     <group ref={renderRoom}>
  //       <Level model={roomModel} textures={roomTextures} />
  //     </group>
  //     <group ref={renderFigures}>
  //       <HomeScreen model={homeModel} />
  //     </group>
  //   </>
  // );

  return (
    <>
      <group ref={renderFigures}>
        <HomeScreen model={homeModel} />
      </group>
      <group ref={renderRoom}>
        <Level model={roomModel} textures={roomTextures} />
      </group>

      {/*{activeScreen === 'room' ? (*/}
      {/*  <Level model={roomModel} textures={roomTextures} />*/}
      {/*) : (*/}
      {/*  <HomeScreen model={homeModel} />*/}
      {/*)}*/}
    </>
  );
};

useGLTF.preload('models/model.glb');
useGLTF.preload('models/figures.glb');
