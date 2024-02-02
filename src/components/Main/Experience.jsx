import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useGLTF } from '@react-three/drei';
import { HomeScreen } from 'src/components/HomeScreen';
import { useTextures } from 'src/hooks/useTextures';
import { Level } from 'src/components/Room/Level';
import { Background } from 'src/components/Main/Background';

export const Experience = () => {
  const activeScreen = useRecoilValue(activeScreenAtom);
  const roomModel = useGLTF('models/model.glb');
  const homeModel = useGLTF('models/figures.glb');
  const roomTextures = useTextures();

  return (
    <>
      {activeScreen === 'room' ? (
        <Level model={roomModel} textures={roomTextures} />
      ) : (
        <HomeScreen model={homeModel} />
      )}
      <Background />
    </>
  );
};

useGLTF.preload('models/model.glb');
useGLTF.preload('models/figures.glb');
