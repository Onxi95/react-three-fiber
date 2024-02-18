import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Canvas shadows>
        <Perf position="top-left" />
        <Outlet />
      </Canvas>
      <div className="absolute bottom-0 w-full flex justify-center gap-5 mb-2">
        <Link to="/">Basic example</Link>
        <Link to="/physics">Physics</Link>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
