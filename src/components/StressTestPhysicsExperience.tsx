import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  type Vector3Tuple,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const cubesCount = 100;

export const StressTestPhysicsExperience = () => {
  const twisterRef = useRef<RapierRigidBody>(null);
  const cubesRef =
    useRef<
      THREE.InstancedMesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.InstancedMeshEventMap
      >
    >(null);

  useEffect(() => {
    if (!cubesRef.current) return;
    for (let i = 0; i < cubesCount; i++) {
      const matrix = new THREE.Matrix4();
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1),
      );
      cubesRef.current.setMatrixAt(i, matrix);
    }
  }, []);

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubesCount; i++) {
      const instance = {
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ] satisfies Vector3Tuple,
        rotation: [
          Math.random(),
          Math.random(),
          Math.random(),
        ] satisfies Vector3Tuple,
      };
      instances.push(instance);
    }

    return instances;
  }, []);

  useFrame(({ clock }) => {
    if (twisterRef.current) {
      const time = clock.getElapsedTime();
      const eulerRotation = new THREE.Euler(0, time * 5, 0);
      const quaternionRotation = new THREE.Quaternion().setFromEuler(
        eulerRotation,
      );

      const angle = time * 1.5;
      const x = Math.cos(angle) * 3;
      const z = Math.sin(angle) * 3;

      twisterRef.current.setNextKinematicTranslation({ x, y: 0.1, z });
      twisterRef.current.setNextKinematicRotation(quaternionRotation);
    }
  });

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
          <CuboidCollider args={[0.5, 6, 10]} position={[-10.5, -5, 0]} />
          <CuboidCollider args={[0.5, 6, 10]} position={[10.5, -5, 0]} />
          <CuboidCollider args={[10, 6, 0.5]} position={[0, -5, -10.5]} />
          <CuboidCollider args={[10, 6, 0.5]} position={[0, -5, 10.5]} />
        </RigidBody>
        <RigidBody
          position={[0, 0.1, 0]}
          type="kinematicPosition"
          ref={twisterRef}
        >
          <mesh castShadow>
            <boxGeometry args={[4, 0.5, 0.5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" restitution={1}>
          <mesh receiveShadow position-y={-0.5}>
            <boxGeometry args={[20, 0.5, 20]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            ref={cubesRef}
            castShadow
            receiveShadow
            args={[undefined, undefined, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
};
