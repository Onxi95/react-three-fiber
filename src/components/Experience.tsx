import { OrbitControls, TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

type SphereMesh = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[],
  Object3DEventMap
>;

export const Experience = () => {
  const knotRef = useRef<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  const groupRef = useRef<Group<Object3DEventMap> | null>(null);
  const sphereMeshRef = useRef<SphereMesh | null>(null);

  // useFrame((_, delta) => {
  // rotate animation
  // knotRef.current!.rotation.y += delta;
  // groupRef.current!.rotation.y += delta * 0.5;
  // groupRef.current!.rotation.x += delta * 0.5;
  // groupRef.current!.rotation.z += delta * 0.5;
  // });

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={4} />
      <ambientLight intensity={1} />
      <group ref={groupRef}>
        <mesh position-x={-2} ref={sphereMeshRef}>
          <sphereGeometry />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <TransformControls
          object={sphereMeshRef as React.MutableRefObject<SphereMesh>}
          mode="scale"
        />
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
