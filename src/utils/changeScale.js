import gsap from 'gsap';

export const changeScaleUp = (mesh, group) => {
  gsap.to(mesh?.scale, {
    x: 1.12,
    y: 1.12,
    z: 1.12,
    duration: 0.5,
    ease: 'power4.out',
    stagger: {
      grid: [20, 20],
      amount: 0.8,
    },
  });

  for (mesh of group) {
    // gsap.to(mesh.material.color, {
    //   r: 0.1,
    //   g: 0.1,
    //   b: 0.1,
    //   duration: 0.7,
    //   ease: 'power4.out',
    // });
  }
};

export const changeScaleDown = (mesh, group) => {
  gsap.to(mesh?.scale, {
    x: 1.0,
    y: 1.0,
    z: 1.0,
    duration: 0.5,
    // ease: 'elastic.out(0.3, 0.1)',
    ease: 'power4.out',
  });
};

export const changeScaleBounced = (mesh) => {
  gsap.from(mesh?.scale, {
    x: 1.17,
    y: 1.17,
    z: 1.17,
    duration: 2.0,
    ease: 'elastic.out(0.4, 0.12)',
    stagger: {
      grid: [20, 20],
      amount: 0.8,
    },
  });
};
