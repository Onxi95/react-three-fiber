import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

export const PhysicsExperience = () => {
  return (
    <>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-mapSize={2048}
      />
      <ambientLight intensity={0.5} />
      <Physics debug>
        <RigidBody>
          <mesh castShadow receiveShadow position={[0, 5, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-2, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody>
          <mesh castShadow receiveShadow position={[2, 4, 0]}>
            <boxGeometry args={[3, 2, 0.5]} />
            <meshStandardMaterial color="green" />
          </mesh>
          <mesh castShadow receiveShadow position={[2, 2, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-0.5}>
            <boxGeometry args={[15, 0.5, 15]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};
