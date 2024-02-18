import {
  Html,
  OrbitControls,
  PivotControls,
  TransformControls,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import { useControls } from "leva";

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

  const { position } = useControls({
    position: 2,
  });

  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        // minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <directionalLight position={[1, 2, 3]} intensity={4} />
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <group ref={groupRef}>
        <mesh position-x={-2} ref={sphereMeshRef}>
          <sphereGeometry />
          <meshStandardMaterial color="yellow" />
          <Html
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 16,
              borderRadius: 32,
              pointerEvents: "none",
              textWrap: "nowrap",
            }}
            position={[0, 1.25, 0]}
            center
            distanceFactor={8}
            occlude={[sphereMeshRef, knotRef]}
          >
            Hello, this is a label
          </Html>
        </mesh>
        <TransformControls
          object={sphereMeshRef as React.MutableRefObject<SphereMesh>}
          mode="translate"
        />
        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
          <mesh position-x={position} position-y={1} ref={knotRef}>
            <torusGeometry />
            <meshStandardMaterial />
          </mesh>
        </PivotControls>
      </group>
      <mesh position-y={-2} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          mirror={0.5}
          resolution={1024}
          blur={[1000, 1000]}
          mixBlur={1}
        />
      </mesh>
      <Float speed={10}>
        <Text fontSize={0.3} color="darkblue">
          Let's gooo
        </Text>
      </Float>
    </>
  );
};
