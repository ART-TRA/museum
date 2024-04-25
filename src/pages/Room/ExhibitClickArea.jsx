export const ExhibitClickArea = ({
  position,
  onClick,
  size = 0.5,
  ...props
}) => {
  return (
    <mesh position={position} onClick={onClick} {...props}>
      <sphereGeometry args={[size, 8]} />
      <meshBasicMaterial color={'red'} wireframe visible={false} />
    </mesh>
  );
};
