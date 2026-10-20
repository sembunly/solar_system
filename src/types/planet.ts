export interface MoonData {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  orbitalSpeed: number;
  rotationSpeed: number;
  color: string;
  diameterKm: number;
  orbitalPeriod: string;
  description: string;
}

export interface PlanetData {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  orbitalSpeed: number;
  rotationSpeed: number;
  color: string;
  description: string;
  diameterKm: number;
  orbitalPeriod: string;
  facts: string[];
  hasRings?: boolean;
  moons: MoonData[];
}

export type CelestialBody = (PlanetData & { kind: "planet"; parentName?: never }) |
  (MoonData & { kind: "moon"; parentName: string });
