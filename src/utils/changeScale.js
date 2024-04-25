import gsap from 'gsap';

export const changeScale = (mesh) => {
  gsap.from(mesh?.scale, {
    x: 0.8,
    y: 0.8,
    z: 0.8,
    duration: 1.2,
    ease: 'elastic.out(1.2, 0.5)',
    stagger: {
      grid: [20, 20],
      amount: 0.8,
    },
  });
};
