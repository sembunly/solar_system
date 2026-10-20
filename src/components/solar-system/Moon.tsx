import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import type { MoonData } from "../../types/planet";

interface MoonProps {
  moon: MoonData;
  selected: boolean;
  onSelect: (id: string) => void;
  onRegister: (id: string, object: THREE.Object3D | null) => void;
}

export default function Moon({ moon, selected, onSelect, onRegister }: MoonProps) {
  const orbit = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const surface = useLoader(TextureLoader, `/textures/moons/${moon.id}.jpg`);
  surface.colorSpace = THREE.SRGBColorSpace;
  surface.anisotropy = gl.capabilities.getMaxAnisotropy();
  const useNaturalColorTint = ["deimos", "enceladus", "europa", "ganymede", "miranda", "phobos", "titan"].includes(moon.id);
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += moon.orbitalSpeed * delta * 0.2;
    if (mesh.current) mesh.current.rotation.y += moon.rotationSpeed * delta;
  });

  return (
    <group ref={orbit}>
      <group position={[moon.orbitRadius, 0, 0]} ref={(object) => onRegister(moon.id, object)}>
        <mesh ref={mesh} onClick={(event) => { event.stopPropagation(); onSelect(moon.id); }}>
          <sphereGeometry args={[moon.radius, 24, 24]} />
          <meshStandardMaterial map={surface} color={useNaturalColorTint ? moon.color : "#ffffff"} roughness={0.92} emissive={selected ? moon.color : "#000000"} emissiveIntensity={selected ? 0.08 : 0} />
        </mesh>
        <mesh onClick={(event) => { event.stopPropagation(); onSelect(moon.id); }}>
          <sphereGeometry args={[moon.radius * 2, 12, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
