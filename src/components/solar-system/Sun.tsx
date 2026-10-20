import { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const surface = useLoader(TextureLoader, "/textures/planets/sun.jpg");
  surface.colorSpace = THREE.SRGBColorSpace;
  surface.anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.08;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.035;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Soft outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial
          color="#ff8b24"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Bright solar surface */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.15, 96, 96]} />
        <meshBasicMaterial map={surface} toneMapped={false} />
      </mesh>

      {/* Light illuminating nearby planets */}
      <pointLight
        color="#ffbd70"
        intensity={160}
        distance={70}
        decay={2}
      />
    </group>
  );
}
