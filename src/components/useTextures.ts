import { useTexture } from '@react-three/drei';

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
    '/textures/scene/AO_wall_1_1.jpg',
    '/textures/scene/AO_wall_1_2.jpg',
    '/textures/scene/AO_wall_1_3.jpg',
    '/textures/scene/AO_wall_1_4.jpg',
    '/textures/scene/AO_wall_1_5.jpg',
    '/textures/scene/AO_wall_1_6.jpg',
    '/textures/scene/AO_wall_1_7.jpg',
    '/textures/scene/AO_wall_1_8.jpg',
    '/textures/scene/AO_wall_1_9.jpg',
    '/textures/scene/AO_wall_1_10.jpg',
    '/textures/scene/AO_wall_1_11.jpg',
    '/textures/scene/AO_wall_1_12.jpg',
    '/textures/scene/AO_wall_1_13.jpg',
  ]);

  // floors ----------------------------------------------------------------------
  const [aoFloor1, aoFloor2, aoFloor3, aoFloor4, aoFloor5, aoCeiling] =
    useTexture([
      '/textures/scene/AO_Floor_1_1.jpg',
      '/textures/scene/AO_Floor_1_2.jpg',
      '/textures/scene/AO_Floor_1_3.jpg',
      '/textures/scene/AO_Floor_1_4.jpg',
      '/textures/scene/AO_Floor_1_5.jpg',
      '/textures/scene/AO_Ceiling.jpg',
    ]);

  // elements --------------------------------------------------------------------
  const [aoEl1, aoEl2, aoEl3, aoEl4] = useTexture([
    '/textures/scene/AO_elements_1_1.jpg',
    '/textures/scene/AO_elements_1_2.jpg',
    '/textures/scene/AO_elements_1_3.jpg',
    '/textures/scene/AO_elements_1_4.jpg',
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
    '/textures/scene/E02_Cups.jpg',
    '/textures/scene/AO_E_02_Caps.jpg',
    '/textures/scene/E03_Bed.jpg',
    '/textures/scene/AO_E_03_Bed.jpg',
    '/textures/scene/E01_Shoes_L.jpg',
    '/textures/scene/E01_Shoes_R.jpg',
    '/textures/scene/AO_E_01_Shoes_L.jpg',
    '/textures/scene/AO_E_01_Shoes_R.jpg',
    '/textures/scene/AO_E_04_Kubiki.jpg',
    '/textures/scene/E04_Kubiki.jpg',
    '/textures/scene/AO_E_05_Child_art.jpg',
    '/textures/scene/E05_Child_art.jpg',
    '/textures/scene/AO_E_06_Xilofon.jpg',
    '/textures/scene/E06_Xilofon.jpg',
    '/textures/scene/AO_E_07_Diary.jpg',
    '/textures/scene/E07_Diary.jpg',
    '/textures/scene/AO_E_08_Kollag.jpg',
    '/textures/scene/E08_Kollaj.jpg',
    '/textures/scene/AO_E_09_Christmass_Ball.jpg',
    '/textures/scene/E09_Christmass_Ball.jpg',
    '/textures/scene/AO_E_10_Bow_tie.jpg',
    '/textures/scene/E10_bow_tie.jpg',
    '/textures/scene/AO_E_11_Ball.jpg',
    '/textures/scene/E11_Ball.jpg',
    '/textures/scene/AO_E_11_Bear.jpg',
    '/textures/scene/E11_Bear.jpg',
    '/textures/scene/AO_E_12_Bear_body.jpg',
    '/textures/scene/E12_bear_body.jpg',
    '/textures/scene/AO_E_11_Hare.jpg',
    '/textures/scene/E11_Hare.jpg',
    '/textures/scene/AO_E_11_Skies.jpg',
    '/textures/scene/E11_Skies.jpg',
    '/textures/scene/AO_E_11_Toy_boxes.jpg',
    '/textures/scene/E11_Toy_boxes.jpg',
    '/textures/scene/AO_E_13_Truck.jpg',
    '/textures/scene/E13_Truck.jpg',
    '/textures/scene/AO_E_14_Doll.jpg',
    '/textures/scene/E14_Dolls.jpg',
    '/textures/scene/AO_E_15_Hand.jpg',
    '/textures/scene/E15_Hand.jpg',
  ]);

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
