import {
  useFrame,
  extend,
  useThree,
  type ReactThreeFiber,
} from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

extend({ OrbitControls });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

export const Experience = () => {
  const knotRef = useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  const groupRef = useRef<Group<Object3DEventMap> | null>(null);

  const { camera, gl } = useThree();

  useFrame(({ clock, camera }, delta) => {
    knotRef.current!.rotation.y += delta;
    groupRef.current!.rotation.y += delta * 0.5;
    groupRef.current!.rotation.x += delta * 0.5;
    groupRef.current!.rotation.z += delta * 0.5;

    const angle = clock.elapsedTime;

    camera.position.x = Math.sin(angle) * 8;
    camera.position.z = Math.cos(angle) * 8;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={4} />
      <ambientLight intensity={1} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <mesh position-x={2} position-y={1} ref={knotRef}>
          <torusGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
      <mesh position-y={-4} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};
