import React from 'react';
import { Float } from '@react-three/drei';

export const FigureWrap = ({ children, floatParams }) => {
  return <Float {...floatParams}>{children}</Float>;
};
