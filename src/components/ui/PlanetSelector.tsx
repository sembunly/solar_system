import type { PlanetData } from "../../types/planet";

interface PlanetSelectorProps {
  planets: PlanetData[];
  selectedPlanet: string;
  onSelect: (id: string) => void;
}

export default function PlanetSelector({
  planets,
  selectedPlanet,
  onSelect,
}: PlanetSelectorProps) {
  return (
    <nav className="planet-selector" aria-label="Select a planet">
      {planets.map((planet) => {
        const active = planet.id === selectedPlanet;

        return (
          <button
            key={planet.id}
            className={`planet-chip ${active ? "active" : ""}`}
            onClick={() => onSelect(planet.id)}
            aria-pressed={active}
            title={planet.name}
          >
            <span
              className={`planet-chip-icon planet-chip-icon-${planet.id}`}
              style={{ backgroundImage: `url(/textures/planets/${planet.id}.jpg)` }}
              aria-hidden="true"
            />

            <span>{planet.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
