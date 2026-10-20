import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import type { PlanetData } from "../../types/planet";
import Moon from "./Moon";
import GoogleEarthTiles from "./GoogleEarthTiles";

interface PlanetProps {
  planet: PlanetData;
  selected: boolean;
  onSelect: (id: string) => void;
  onRegister: (id: string, object: THREE.Object3D | null) => void;
}

export default function Planet({ planet, selected, onSelect, onRegister }: PlanetProps) {
  const orbitRef = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const surface = useLoader(TextureLoader, `/textures/planets/${planet.id}.jpg`);
  surface.colorSpace = THREE.SRGBColorSpace;
  surface.anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += planet.orbitalSpeed * delta * 0.18;
    if (surfaceRef.current) surfaceRef.current.rotation.y += planet.rotationSpeed * delta;
  });

  return (
    <group ref={orbitRef}>
      <group position={[planet.orbitRadius, 0, 0]}>
        <group ref={(object) => onRegister(planet.id, object)}>
          <group ref={surfaceRef}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect(planet.id);
              }}
            >
              <sphereGeometry args={[planet.radius, 48, 48]} />
              <meshStandardMaterial
                map={surface}
                roughness={0.8}
                metalness={0.05}
                transparent={planet.id === "earth" && selected}
                opacity={planet.id === "earth" && selected ? 0.2 : 1}
                depthWrite={!(planet.id === "earth" && selected)}
              />
              {planet.hasRings && (
                <group rotation={[1.1, 0, 0]}>
                  {[
                    [1.25, 1.48, "#b8a783"],
                    [1.55, 1.83, "#d7c49b"],
                    [1.91, 2.1, "#a99b7b"],
                  ].map(([inner, outer, color], index) => (
                    <mesh key={index}>
                      <ringGeometry args={[planet.radius * Number(inner), planet.radius * Number(outer), 128, 3]} />
                      <meshStandardMaterial color={String(color)} roughness={0.9} side={THREE.DoubleSide} />
                    </mesh>
                  ))}
                </group>
              )}
            </mesh>
            {planet.id === "earth" && selected && <GoogleEarthTiles />}
          </group>

          {planet.moons.map((moon) => (
            <Moon key={moon.id} moon={moon} selected={selected} onSelect={onSelect} onRegister={onRegister} />
          ))}

          <Html
            position={[0, planet.radius + 0.35, 0]}
            center
            distanceFactor={16}
            occlude={false}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                color: selected ? "#f4d6a0" : "#dce5f2",
                fontSize: "11px",
                fontFamily: "Inter, sans-serif",
                whiteSpace: "nowrap",
                textShadow: "0 1px 8px #000",
                opacity: selected ? 1 : 0.75,
              }}
            >
              {planet.name}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}
