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

      <div className="eyebrow info-panel-label">
        <span>SOLAR SYSTEM / {planet.kind.toUpperCase()}{planet.kind === "moon" ? ` · ${planet.parentName}` : ""}</span>
      </div>

      <div
        className={`planet-preview planet-preview-${planet.id}`}
        style={{
          backgroundColor: planet.color,
          backgroundImage: `radial-gradient(circle at 30% 24%, rgba(255,255,255,0.24), transparent 38%), linear-gradient(125deg, transparent 40%, rgba(0,0,0,0.68) 100%), url(/textures/${planet.kind === "moon" ? "moons" : "planets"}/${planet.id}.jpg)`,
          backgroundSize: "100% 100%, 100% 100%, 200% 100%",
          backgroundPosition: "center, center, center",
          boxShadow: `0 0 50px ${planet.color}35`,
        }}
        role="img"
        aria-label={`${planet.name} texture`}
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
