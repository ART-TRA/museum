import React from 'react';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import { Hand } from 'src/icons/Hand';

export const SuspenseFallback = () => {
  return (
    <section className="overlay overlay--fallback">
      <div className="overlay--loader">
        <FadeIn />
        <Hand />
      </div>
    </section>
  );
};
