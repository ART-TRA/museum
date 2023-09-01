// import React, { useEffect, useState } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import eventAtom from 'src/Recoil/Atoms/event';
// import lightAtom from 'src/Recoil/Atoms/light';
// import cn from 'classnames';
// import { Sun } from 'src/Icons/Sun';
// import { Moon } from 'src/Icons/Moon';
// import { useProgress } from '@react-three/drei';
// import touchAtom from 'src/Recoil/Atoms/hasTouch';
// // import dragImg from '/images/drag.svg';
// import startAtom from 'src/Recoil/Atoms/hasStart.js';
//
// const Event = () => {
//   const event = useRecoilValue(eventAtom);
//   const light = useRecoilValue(lightAtom);
//   const eventClassNames = cn('overlay__event', {
//     'overlay__event--only-text': !event.title,
//     'overlay__event--white': !light,
//     'overlay__event--hidden': !event.isEventVisible,
//   });
//
//   if (event)
//     return (
//       <div className={eventClassNames}>
//         <div className="overlay__event--info">
//           {event.picture && <img src={event.picture} alt="event" />}
//           <div className="overlay__event--info-text">
//             {event.title && <h2>{event.title}</h2>}
//             {event.description && (
//               <p>
//                 {event.description} {event?.link}
//               </p>
//             )}
//           </div>
//         </div>
//         {event.button && <button>{event.button}</button>}
//       </div>
//     );
// };
//
export const Overlay = () => {
  //   const { progress } = useProgress();
  //   const [hasTouch, setTouch] = useRecoilState(touchAtom);
  //   const [light, setLight] = useRecoilState(lightAtom);
  //   const [isStart, setStart] = useRecoilState(startAtom);
  //   const overlayClassNames = cn('overlay', {
  //     'overlay--loader': !isStart,
  //   });
  //   const buttonLoaderClassNames = cn('overlay__button-loader', {
  //     'overlay__button-loader--loaded': progress === 100,
  //   });
  //   const introClassNames = cn('overlay__event overlay__event-intro', {
  //     'overlay__event-intro--disappear': hasTouch,
  //     'overlay__event-intro--white': !light,
  //   });
  //
  //   const onTurnLight = () => {
  //     setLight((prev) => !prev);
  //   };
  //
  //   const onStart = () => {
  //     if (progress === 100) {
  //       setStart(true);
  //     }
  //   };
  //
  //   return (
  //     <section className={overlayClassNames}>
  //       {!isStart ? (
  //         <>
  //           <h1>WELCOME TO MY WORLD!</h1>
  //           <button className={buttonLoaderClassNames} onClick={onStart}>
  //             <div
  //               className="overlay__button-loader--indicator"
  //               style={{
  //                 width: `${progress}%`,
  //                 backgroundColor: progress === 100 ? 'transparent' : '#fff',
  //               }}
  //             />
  //             {progress === 100 ? 'EXPLORE' : 'LOADING'}
  //           </button>
  //         </>
  //       ) : (
  //         <>
  //           <Event />
  //           {progress === 100 && (
  //             <>
  //               <div className={introClassNames}>
  //                 {/*<img src={dragImg} alt="intro" />*/}
  //                 <h2>DRAG TO EXPLORE</h2>
  //               </div>
  //               <button className="overlay__button-theme" onClick={onTurnLight}>
  //                 {light ? <Sun /> : <Moon />}
  //               </button>
  //             </>
  //           )}
  //         </>
  //       )}
  //     </section>
  //   );

  return null;
};
