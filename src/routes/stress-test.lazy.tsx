import { createLazyFileRoute } from "@tanstack/react-router";
import { StressTestPhysicsExperience } from "../components/StressTestPhysicsExperience";

export const Route = createLazyFileRoute("/stress-test")({
  component: Physics,
});

function Physics() {
  return <StressTestPhysicsExperience />;
}
