import { useKTX2, useTexture } from '@react-three/drei';

export const useTextures = () => {
  // walls -----------------------------------------------------------------------
  const [
    aoWall1,
    aoWall2,
    aoWall3,
    aoWall4,
    aoWall5,
    aoWall6,
    aoWall7,
    aoWall8,
    aoWall9,
    aoWall10,
    aoWall11,
    aoWall12,
    aoWall13,
  ] = useTexture([
    '/textures/scene/AO_wall_1_1.webp',
    '/textures/scene/AO_wall_1_2.webp',
    '/textures/scene/AO_wall_1_3.webp',
    '/textures/scene/AO_wall_1_4.webp',
    '/textures/scene/AO_wall_1_5.webp',
    '/textures/scene/AO_wall_1_6.webp',
    '/textures/scene/AO_wall_1_7.webp',
    '/textures/scene/AO_wall_1_8.webp',
    '/textures/scene/AO_wall_1_9.webp',
    '/textures/scene/AO_wall_1_10.webp',
    '/textures/scene/AO_wall_1_11.webp',
    '/textures/scene/AO_wall_1_12.webp',
    '/textures/scene/AO_wall_1_13.webp',
  ]);

  // floors ----------------------------------------------------------------------
  const [aoFloor1, aoFloor2, aoFloor3, aoFloor4, aoFloor5, aoCeiling] =
    useTexture([
      '/textures/scene/AO_Floor_1_1.webp',
      '/textures/scene/AO_Floor_1_2.webp',
      '/textures/scene/AO_Floor_1_3.webp',
      '/textures/scene/AO_Floor_1_4.webp',
      '/textures/scene/AO_Floor_1_5.webp',
      '/textures/scene/AO_Ceiling.webp',
    ]);

  // elements --------------------------------------------------------------------
  const [aoEl1, aoEl2, aoEl3, aoEl4] = useTexture([
    '/textures/scene/AO_elements_1_1.webp',
    '/textures/scene/AO_elements_1_2.webp',
    '/textures/scene/AO_elements_1_3.webp',
    '/textures/scene/AO_elements_1_4.webp',
  ]);

  // exhibits --------------------------------------------------------------------
  const [
    cups,
    aoCups,
    bed,
    aoBed,
    shoe1,
    shoe2,
    aoShoe1,
    aoShoe2,
    aoCubes,
    cubes,
    aoArt,
    art,
    aoXylophone,
    xylophone,
    aoDiary,
    diary,
    aoCollage,
    collage,
    aoBauble,
    bauble,
    aoBowTie,
    bowTie,
    aoBall,
    ball,
    aoBear1,
    bear1,
    aoBear2,
    bear2,
    aoHare,
    hare,
    aoSkies,
    skies,
    aoToyBoxes,
    toyBoxes,
    aoTruck,
    truck,
    aoDoll,
    doll,
    aoHand,
    hand,
  ] = useTexture([
    '/textures/scene/E02_Cups.webp',
    '/textures/scene/AO_E_02_Caps.webp',
    '/textures/scene/E03_Bed.webp',
    '/textures/scene/AO_E_03_Bed.webp',
    '/textures/scene/E01_Shoes_L.webp',
    '/textures/scene/E01_Shoes_R.webp',
    '/textures/scene/AO_E_01_Shoes_L.webp',
    '/textures/scene/AO_E_01_Shoes_R.webp',
    '/textures/scene/AO_E_04_Kubiki.webp',
    '/textures/scene/E04_Kubiki.webp',
    '/textures/scene/AO_E_05_Child_art.webp',
    '/textures/scene/E05_Child_art.webp',
    '/textures/scene/AO_E_06_Xilofon.webp',
    '/textures/scene/E06_Xilofon.webp',
    '/textures/scene/AO_E_07_Diary.webp',
    '/textures/scene/E07_Diary.webp',
    '/textures/scene/AO_E_08_Kollag.webp',
    '/textures/scene/E08_Kollaj.webp',
    '/textures/scene/AO_E_09_Christmass_Ball.webp',
    '/textures/scene/E09_Christmass_Ball.webp',
    '/textures/scene/AO_E_10_Bow_tie.webp',
    '/textures/scene/E10_bow_tie.webp',
    '/textures/scene/AO_E_11_Ball.webp',
    '/textures/scene/E11_Ball.webp',
    '/textures/scene/AO_E_11_Bear.webp',
    '/textures/scene/E11_Bear.webp',
    '/textures/scene/AO_E_12_Bear_body.webp',
    '/textures/scene/E12_bear_body.webp',
    '/textures/scene/AO_E_11_Hare.webp',
    '/textures/scene/E11_Hare.webp',
    '/textures/scene/AO_E_11_Skies.webp',
    '/textures/scene/E11_Skies.webp',
    '/textures/scene/AO_E_11_Toy_boxes.webp',
    '/textures/scene/E11_Toy_boxes.webp',
    '/textures/scene/AO_E_13_Truck.webp',
    '/textures/scene/E13_Truck.webp',
    '/textures/scene/AO_E_14_Doll.webp',
    '/textures/scene/E14_Dolls.webp',
    '/textures/scene/AO_E_15_Hand.webp',
    '/textures/scene/E15_Hand.webp',
  ]);

  // const [bed] = useKTX2(['/textures/scene/E03_Bed.ktx2']);

  aoWall1.flipY =
    aoWall2.flipY =
    aoWall3.flipY =
    aoWall4.flipY =
    aoWall5.flipY =
    aoWall6.flipY =
    aoWall7.flipY =
    aoWall8.flipY =
    aoWall9.flipY =
    aoWall10.flipY =
    aoWall11.flipY =
    aoWall12.flipY =
    aoWall13.flipY =
      false;

  aoEl1.flipY = aoEl2.flipY = aoEl3.flipY = aoEl4.flipY = false;

  aoFloor1.flipY =
    aoFloor2.flipY =
    aoFloor3.flipY =
    aoFloor4.flipY =
    aoFloor5.flipY =
    aoCeiling.flipY =
      false;

  cups.flipY =
    aoCups.flipY =
    bed.flipY =
    aoBed.flipY =
    shoe1.flipY =
    shoe2.flipY =
    aoShoe1.flipY =
    aoShoe2.flipY =
    aoCubes.flipY =
    cubes.flipY =
    art.flipY =
    aoArt.flipY =
    xylophone.flipY =
    aoXylophone.flipY =
    aoDiary.flipY =
    diary.flipY =
    aoCollage.flipY =
    collage.flipY =
    aoBauble.flipY =
    bauble.flipY =
    aoBowTie.flipY =
    bowTie.flipY =
    ball.flipY =
    aoBall.flipY =
    bear1.flipY =
    aoBear1.flipY =
    bear2.flipY =
    aoBear2.flipY =
    aoHare.flipY =
    hare.flipY =
    skies.flipY =
    aoSkies.flipY =
    aoToyBoxes.flipY =
    toyBoxes.flipY =
    truck.flipY =
    aoTruck.flipY =
    aoDoll.flipY =
    doll.flipY =
    aoHand.flipY =
    hand.flipY =
      false;

  return {
    walls: {
      aoWall1,
      aoWall2,
      aoWall3,
      aoWall4,
      aoWall5,
      aoWall6,
      aoWall7,
      aoWall8,
      aoWall9,
      aoWall10,
      aoWall11,
      aoWall12,
      aoWall13,
    },
    floors: { aoFloor1, aoFloor2, aoFloor3, aoFloor4, aoFloor5, aoCeiling },
    elements: {
      aoEl1,
      aoEl2,
      aoEl3,
      aoEl4,
    },
    exhibits: {
      cups,
      aoCups,
      bed,
      aoBed,
      shoe1,
      shoe2,
      aoShoe1,
      aoShoe2,
      aoCubes,
      cubes,
      aoArt,
      art,
      aoXylophone,
      xylophone,
      aoDiary,
      diary,
      aoCollage,
      collage,
      aoBauble,
      bauble,
      aoBowTie,
      bowTie,
      aoBall,
      ball,
      aoBear1,
      bear1,
      aoBear2,
      bear2,
      aoHare,
      hare,
      aoSkies,
      skies,
      aoToyBoxes,
      toyBoxes,
      aoTruck,
      truck,
      aoDoll,
      doll,
      aoHand,
      hand,
    },
  };
};
