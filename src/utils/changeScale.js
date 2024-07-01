import gsap from 'gsap';

export const changeScale = (mesh) => {
  gsap.to(mesh?.scale, {
    x: 1.12,
    y: 1.12,
    z: 1.12,
    duration: 0.5,
    // ease: 'elastic.out(0.3, 0.1)',
    ease: 'power4.out',
    stagger: {
      grid: [20, 20],
      amount: 0.8,
    },
    onComplete: () => {
      gsap.to(mesh?.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.8,
        ease: 'elastic.out(0.4, 0.1)',
        stagger: {
          grid: [20, 20],
          amount: 0.8,
        },
      });
    },
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
