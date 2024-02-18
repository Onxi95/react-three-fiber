import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Perf } from "r3f-perf";

function App() {
  return (
    <Canvas>
      <Perf position="top-left" />
      <Experience />
    </Canvas>
  );
}

export default App;
