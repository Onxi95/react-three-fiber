import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";

export const PhysicsExperience = () => {
  const torusRef = useRef<RapierRigidBody>(null);

  const onTorusClick = () => {
    if (torusRef.current) {
      torusRef.current.applyImpulse({ x: 0, y: 15, z: 0 }, true);
    }
  };

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
        <RigidBody
          colliders="trimesh"
          position={[-1, 5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          ref={torusRef}
        >
          <mesh castShadow receiveShadow onClick={onTorusClick}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshNormalMaterial />
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
