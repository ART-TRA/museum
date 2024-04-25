import React, { useContext, useLayoutEffect, useMemo } from 'react';
import {
  EffectComposer,
  SSR,
  Bloom,
  LUT,
  EffectComposerContext,
} from '@react-three/postprocessing';
import {
  SSGIEffect,
  TRAAEffect,
  MotionBlurEffect,
  VelocityDepthNormalPass,
} from 'realism-effects';

const RealismEffects = () => {
  const { scene, camera, composer } = useContext(EffectComposerContext);
  const velocityDepthNormalPass = useMemo(
    () => new VelocityDepthNormalPass(scene, camera),
    [scene, camera]
  );

  const ssgiEffect = useMemo(
    () =>
      new SSGIEffect(scene, camera, velocityDepthNormalPass, {
        distance: 2,
        autoThickness: false,
        thickness: 1.2,
        maxRoughness: 1,
        envBlur: 0.5,
        importanceSampling: true,
        blend: 0.9,
        denoiseIterations: 3,
        denoiseKernel: 3,
        denoiseDiffuse: 40,
        denoiseSpecular: 40,
        depthPhi: 5,
        normalPhi: 28,
        roughnessPhi: 18,
        resolutionScale: 1,
        missedRays: false,
        refineSteps: 4,
        spp: 4,
        steps: 20,
      }),
    [scene, camera, velocityDepthNormalPass]
  );
  const traaEffect = useMemo(
    () => new TRAAEffect(scene, camera, velocityDepthNormalPass),
    [scene, camera, velocityDepthNormalPass]
  );
  const motionBlurEffect = useMemo(
    () => new MotionBlurEffect(velocityDepthNormalPass),
    [velocityDepthNormalPass]
  );

  useLayoutEffect(() => {
    composer.addPass(velocityDepthNormalPass);
    return () => {
      composer.removePass(velocityDepthNormalPass);
    };
  }, [velocityDepthNormalPass, composer]);

  return (
    <>
      <primitive object={ssgiEffect} />
      {/*<primitive object={traaEffect} />*/}
      {/*<primitive object={motionBlurEffect} />*/}
    </>
  );
};

export const Effects = () => {
  return (
    <EffectComposer disableNormalPass>
      <RealismEffects />
    </EffectComposer>
  );
};
