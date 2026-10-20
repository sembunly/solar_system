import { Canvas } from "@react-three/fiber";
import SolarSystemScene from "./SolarSystemScene";

interface SolarSystemCanvasProps {
  selectedPlanet: string;
  onSelectPlanet: (id: string) => void;
  focusRequest: number;
}

export default function SolarSystemCanvas({
  selectedPlanet,
  onSelectPlanet,
  focusRequest,
}: SolarSystemCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 19, 27],
        fov: 45,
        near: 0.1,
        far: 120,
      }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: false,
      }}
      onPointerMissed={() => onSelectPlanet("")}
    >
      <SolarSystemScene
        selectedPlanet={selectedPlanet}
        onSelectPlanet={onSelectPlanet}
        focusRequest={focusRequest}
      />
    </Canvas>
  );
}
