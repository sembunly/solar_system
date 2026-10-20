import type { CelestialBody } from "../../types/planet";

interface PlanetInfoPanelProps {
  planet: CelestialBody | undefined;
  onClose: () => void;
}

export default function PlanetInfoPanel({
  planet,
  onClose,
}: PlanetInfoPanelProps) {
  if (!planet) return null;

  return (
    <aside className="info-panel">
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Close planet information"
      >
        ×
      </button>

      <div className="eyebrow">SOLAR SYSTEM / {planet.kind.toUpperCase()}{planet.kind === "moon" ? ` · ${planet.parentName}` : ""}</div>

      <div
        className="planet-preview"
        style={{
          background: `radial-gradient(
            circle at 30% 25%,
            white -100%,
            ${planet.color} 35%,
            #101522 100%
          )`,
          boxShadow: `0 0 50px ${planet.color}35`,
        }}
      />

      <h2>{planet.name}</h2>

      <p className="planet-description">
        {planet.description}
      </p>

      {planet.kind === "planet" && (
        <div className="fact-list">
          {planet.facts.map((fact) => (
            <div className="fact-item" key={fact}>
              <span className="fact-dot" />
              {fact}
            </div>
          ))}
        </div>
      )}

      <div className="planet-stats">
        <div>
          <span>Diameter</span>
          <strong>{planet.diameterKm.toLocaleString()} km</strong>
        </div>
        <div>
          <span>Orbital period</span>
          <strong>{planet.orbitalPeriod}</strong>
        </div>
      </div>
    </aside>
  );
}
