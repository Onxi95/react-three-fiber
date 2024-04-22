import { createLazyFileRoute } from "@tanstack/react-router";
import { PhysicsExperience } from "../components/PhysicsExperience";

export const Route = createLazyFileRoute("/physics")({
  component: Physics,
});

function Physics() {
  return <PhysicsExperience />;
}
