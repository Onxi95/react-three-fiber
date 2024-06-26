import { OrbitControls, Text } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  type Vector3Tuple,
} from "@react-three/rapier";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash-es";
import * as THREE from "three";

import { useControls } from "leva";

const defaultGravity: [number, number, number] = [0, -9.81, 0];
const radians = (deg: number) => (deg * Math.PI) / 180;

export const GyroscopeExperience = () => {
  const [gravity, setGravity] = useState(defaultGravity);
  const { gravityMultiplier, cubesCount, debug } = useControls({
    gravityMultiplier: 9,
    cubesCount: 50,
    debug: false,
  });

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
        new THREE.Vector3(1, 1, 1)
      );
      cubesRef.current.setMatrixAt(i, matrix);
    }
  }, [cubesCount]);

  const handleDeviceOrientationChange = useCallback(
    debounce((e: DeviceOrientationEvent) => {
      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      const betaRad = radians(beta);
      const gammaRad = radians(gamma);

      const gx = Math.sin(gammaRad) * Math.cos(betaRad);
      const gy = -Math.sin(betaRad);
      const gz = Math.cos(gammaRad) * Math.cos(betaRad);

      setGravity([
        gx * gravityMultiplier,
        gy * gravityMultiplier,
        -gz * gravityMultiplier,
      ]);
    }, 20),
    []
  );

  useEffect(() => {
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener(
        "deviceorientation",
        handleDeviceOrientationChange
      );
    } else {
      console.log("Device Orientation API not supported.");
    }

    return () =>
      window.removeEventListener(
        "deviceorientation",
        handleDeviceOrientationChange
      );
  });

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubesCount; i++) {
      const instance = {
        key: `instance_${Date()}-${i}`,
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
  }, [cubesCount]);

  return (
    <>
      <Text fontSize={0.3} color="darkblue">
        {debug && gravity.toString()}
      </Text>
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
      <Physics debug={debug} gravity={gravity}>
        <RigidBody
          type="fixed"
          restitution={0}
          position={[0, -0.5, 0]}
          friction={0}
        >
          <CuboidCollider args={[0.5, 30, 10]} position={[-10.5, 30, 0]} />
          <CuboidCollider args={[0.5, 30, 10]} position={[10.5, 30, 0]} />
          <CuboidCollider args={[10, 30, 0.5]} position={[0, 30, -10.5]} />
          <CuboidCollider args={[10, 30, 0.5]} position={[0, 30, 10.5]} />
          <CuboidCollider args={[10, 0.5, 10]} position={[0, 60, 0]} />
        </RigidBody>
        <RigidBody type="fixed" restitution={1} friction={0}>
          <mesh receiveShadow position-y={-0.5}>
            <boxGeometry args={[20, 0.5, 20]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <InstancedRigidBodies
          instances={instances}
          friction={0}
          restitution={0}
          canSleep={false}
        >
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
