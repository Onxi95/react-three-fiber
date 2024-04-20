import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";

export const PhysicsExperience = () => {
  const torusRef = useRef<RapierRigidBody>(null);

  const onTorusClick = () => {
    if (torusRef.current) {
      torusRef.current.applyImpulse(
        {
          x: -5,
          y: 10,
          z: 2,
        },
        true,
      );
      torusRef.current.applyTorqueImpulse(
        {
          x: -Math.random() - 0.5,
          y: Math.random() - 0.5,
          z: Math.random() - 0.5,
        },
        true,
      );
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
          gravityScale={0.1}
          colliders="trimesh"
          position={[-1, 5, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
          friction={0}
          restitution={2}
          ref={torusRef}
        >
          <mesh castShadow onClick={onTorusClick}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="turquoise" />
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
        <RigidBody type="fixed" restitution={1}>
          <mesh receiveShadow position-y={-0.5}>
            <boxGeometry args={[100, 0.5, 100]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};
