import { useCallback, useState } from "react";
import SolarSystemCanvas from "./components/solar-system/SolarSystemCanvas";
import PlanetInfoPanel from "./components/ui/PlanetInfoPanel";
import PlanetSelector from "./components/ui/PlanetSelector";
import { allBodies, planets } from "./data/planets";

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState("earth");
  const [focusRequest, setFocusRequest] = useState(0);
  const selectBody = useCallback((id: string) => {
    setSelectedPlanet(id);
    setFocusRequest((request) => request + 1);
  }, []);

  const selected = allBodies.find((body) => body.id === selectedPlanet);

  return (
    <main className="app">
      {/* Full-screen 3D world */}
      <div className="scene">
        <SolarSystemCanvas
          selectedPlanet={selectedPlanet}
          onSelectPlanet={selectBody}
          focusRequest={focusRequest}
        />
      </div>

      {/* Header overlay */}
      <header className="topbar">
        <a className="brand" href="#" aria-label="Solar System home">
          <span>
            <strong>SOLAR</strong>
            <small>AN INTERACTIVE UNIVERSE</small>
          </span>
        </a>

        <div className="live-status">
          <span className="status-dot" />
          SYSTEM ACTIVE
        </div>
      </header>

      {/* Scene title */}
      <section className="hero">
        <div className="eyebrow">OUR COSMIC NEIGHBORHOOD</div>
        <h1>
          The Solar
          <br />
          <span>System.</span>
        </h1>
        <p>
          Eight planets. One star.
          <br />
          An extraordinary universe to explore.
        </p>
        <div className="hero-hint">
          <span className="hint-icon">↗</span>
          DRAG TO EXPLORE · SCROLL TO ZOOM
        </div>
      </section>

      {/* Selected planet details */}
      <PlanetInfoPanel
        planet={selected}
        onClose={() => selectBody("")}
      />

      {/* Planet navigation */}
      <footer className="bottom-bar">
        <div className="bottom-label">
          <span>EXPLORE</span>
          <span className="planet-count">{planets.length} PLANETS</span>
        </div>

        <PlanetSelector
          planets={planets}
          selectedPlanet={selectedPlanet}
          onSelect={selectBody}
        />
      </footer>
    </main>
  );
}
