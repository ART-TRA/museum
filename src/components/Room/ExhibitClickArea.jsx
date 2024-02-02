export const ExhibitClickArea = ({ position, onClick, size = 0.5 }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[size, 16]} />
      <meshBasicMaterial color={'red'} wireframe visible={false} />
    </mesh>
  );
};
