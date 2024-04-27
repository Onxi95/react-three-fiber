import { createLazyFileRoute } from "@tanstack/react-router";
import { GyroscopeExperience } from "../components/GyroscopeExperience";

export const Route = createLazyFileRoute("/gyroscope")({
  component: Physics,
});

function Physics() {
  return <GyroscopeExperience />;
}
