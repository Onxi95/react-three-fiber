import { createLazyFileRoute } from "@tanstack/react-router";
import { Experience } from "../components/Experience";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <Experience />;
}
