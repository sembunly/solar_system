import { useMemo } from "react";

export default function StarField() {
  const positions = useMemo(() => {
    const count = 2500;
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      values[i * 3] = (Math.random() - 0.5) * 100;
      values[i * 3 + 1] = (Math.random() - 0.5) * 70;
      values[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#c8d9ed"
        size={0.065}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
