import { createLazyFileRoute } from "@tanstack/react-router";
import { Experience } from "../components/Experience";

export const Route = createLazyFileRoute("/physics")({
  component: Physics,
});

function Physics() {
  return (
    <>
      <Experience />
    </>
  );
}
