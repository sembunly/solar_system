import * as THREE from "three";

interface OrbitProps {
  radius: number;
  selected?: boolean;
}

export default function Orbit({
  radius,
  selected = false,
}: OrbitProps) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, 0]}
    >
      <ringGeometry args={[radius - 0.008, radius + 0.008, 192]} />
      <meshBasicMaterial
        color={selected ? "#e5c58d" : "#718096"}
        transparent
        opacity={selected ? 0.65 : 0.25}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
