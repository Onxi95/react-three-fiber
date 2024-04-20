import { OrbitControls } from "@react-three/drei";

export const PhysicsExperience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <mesh castShadow position={[-2, 2, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh castShadow receiveShadow position={[2, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh receiveShadow position-y={-0.5}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      
    </>
  );
};
