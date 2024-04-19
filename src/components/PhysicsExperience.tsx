import { Environment, OrbitControls } from "@react-three/drei";

export const PhysicsExperience = () => {
  return (
    <Environment background preset="sunset">
      <OrbitControls makeDefault />
    </Environment>
  );
};
