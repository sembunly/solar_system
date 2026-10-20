import { Suspense, useCallback, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Sun from "./Sun";
import Planet from "./Planet";
import Orbit from "./Orbit";
import StarField from "./StarField";
import { allBodies, planets } from "../../data/planets";

interface SolarSystemSceneProps {
  selectedPlanet: string;
  onSelectPlanet: (id: string) => void;
  focusRequest: number;
}

export default function SolarSystemScene({
  selectedPlanet,
  onSelectPlanet,
  focusRequest,
}: SolarSystemSceneProps) {
  const bodyRefs = useRef(new Map<string, THREE.Object3D>());
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const focusTarget = useRef(new THREE.Vector3());
  const focusPosition = useRef(new THREE.Vector3());
  const focusDistance = useRef(12);
  const focusTransition = useRef(0);
  const selectedRadius = allBodies.find((item) => item.id === selectedPlanet)?.radius ?? 1;
  useEffect(() => {
    focusDistance.current = Math.max(2.2, selectedRadius * 5.5);
    focusTransition.current = 1.5;
  }, [selectedPlanet, selectedRadius, focusRequest]);
  const registerBody = useCallback((id: string, object: THREE.Object3D | null) => {
    if (object) bodyRefs.current.set(id, object);
    else bodyRefs.current.delete(id);
  }, []);

  useFrame((_, delta) => {
    const body = bodyRefs.current.get(selectedPlanet);
    if (body) body.getWorldPosition(focusTarget.current);
    else focusTarget.current.set(0, 0, 0);
    const direction = camera.position.clone().sub(controls.current?.target ?? new THREE.Vector3()).normalize();
    const currentDistance = camera.position.distanceTo(controls.current?.target ?? focusTarget.current);
    if (focusTransition.current > 0) {
      focusTransition.current = Math.max(0, focusTransition.current - delta);
      const distance = THREE.MathUtils.damp(currentDistance, focusDistance.current, 2.8, delta);
      focusPosition.current.copy(focusTarget.current).add(direction.multiplyScalar(distance));
    } else {
      focusPosition.current.copy(focusTarget.current).add(direction.multiplyScalar(currentDistance));
    }
    const blend = 1 - Math.exp(-2.4 * delta);
    camera.position.lerp(focusPosition.current, blend);
    controls.current?.target.lerp(focusTarget.current, blend);
  });

  return (
    <>
      <color attach="background" args={["#030711"]} />

      <fog attach="fog" args={["#030711", 35, 75]} />

      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#9eb9e8", "#120d13", 0.28]} />

      <StarField />

      <Suspense fallback={null}>
        <Sun />

        {planets.map((planet) => (
          <Orbit
            key={planet.id}
            radius={planet.orbitRadius}
            selected={planet.id === selectedPlanet || planet.moons.some((body) => body.id === selectedPlanet)}
          />
        ))}

        {planets.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            selected={planet.id === selectedPlanet || planet.moons.some((moon) => moon.id === selectedPlanet)}
            onSelect={onSelectPlanet}
            onRegister={registerBody}
          />
        ))}
      </Suspense>

      <OrbitControls
        ref={controls}
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={1.5}
        maxDistance={50}
        maxPolarAngle={Math.PI * 0.48}
        target={[0, 0, 0]}
      />
    </>
  );
}
