import type { CelestialBody } from "../../types/planet";

interface PlanetSelectorProps {
  planets: CelestialBody[];
  selectedPlanet: string;
  onSelect: (id: string) => void;
}

export default function PlanetSelector({
  planets,
  selectedPlanet,
  onSelect,
}: PlanetSelectorProps) {
  return (
    <nav className="planet-selector" aria-label="Select a planet or moon">
      {planets.map((planet) => {
        const active = planet.id === selectedPlanet;

        return (
          <button
            key={planet.id}
            className={`planet-chip ${planet.kind === "moon" ? "moon-chip" : ""} ${active ? "active" : ""}`}
            onClick={() => onSelect(planet.id)}
            aria-pressed={active}
            title={planet.kind === "moon" ? `${planet.name} · ${planet.parentName}` : planet.name}
          >
            <span
              className="planet-chip-dot"
              style={{ background: planet.color }}
            />

            <span>{planet.kind === "moon" ? `☾ ${planet.name}` : planet.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
