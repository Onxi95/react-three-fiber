import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

const hitSound = new Audio(
  "https://cdn.pixabay.com/audio/2022/03/21/audio_39bb9ae400.mp3"
);

export const PhysicsExperience = () => {
  const torusRef = useRef<RapierRigidBody>(null);
  const twisterRef = useRef<RapierRigidBody>(null);

  useFrame(({ clock }) => {
    if (twisterRef.current) {
      const time = clock.getElapsedTime();
      const eulerRotation = new THREE.Euler(0, time * 5, 0);
      const quaternionRotation = new THREE.Quaternion().setFromEuler(
        eulerRotation
      );

      const angle = time * 1.5;
      const x = Math.cos(angle) * 3;
      const z = Math.sin(angle) * 3;

      twisterRef.current.setNextKinematicTranslation({ x, y: 0.1, z });
      twisterRef.current.setNextKinematicRotation(quaternionRotation);
    }
  });

  const onTorusClick = () => {
    if (torusRef.current) {
      torusRef.current.applyImpulse(
        {
          x: -5,
          y: 10,
          z: 2,
        },
        true
      );
      torusRef.current.applyTorqueImpulse(
        {
          x: -Math.random() - 0.5,
          y: Math.random() - 0.5,
          z: Math.random() - 0.5,
        },
        true
      );
    }
  };

  const onHit = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random() * 0.5 + 0.5;
    hitSound.play();
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
        <RigidBody type="fixed" restitution={1} position={[0, 10, 0]}>
          <CuboidCollider args={[10, 0.5, 10]} />
          <CuboidCollider args={[0.5, 5, 5]} position={[-5.5, -5, 0]} />
          <CuboidCollider args={[0.5, 5, 5]} position={[5.5, -5, 0]} />
          <CuboidCollider args={[5, 5, 0.5]} position={[0, -5, -5.5]} />
          <CuboidCollider args={[5, 5, 0.5]} position={[0, -5, 5.5]} />
        </RigidBody>
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
        <RigidBody
          position={[0, 0.1, 0]}
          type="kinematicPosition"
          ref={twisterRef}
          onCollisionEnter={onHit}
        >
          <mesh castShadow>
            <boxGeometry args={[4, 0.5, 0.5]} />
            <meshStandardMaterial color="red" />
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
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};
