import {
  TilesAttributionOverlay,
  TilesPlugin,
  TilesRenderer,
} from "3d-tiles-renderer/r3f";
import { GoogleCloudAuthPlugin } from "3d-tiles-renderer/plugins";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const EARTH_RADIUS_METERS = 6_378_137;
const EARTH_SCENE_RADIUS = 0.37;
const earthScale = EARTH_SCENE_RADIUS / EARTH_RADIUS_METERS;

export default function GoogleEarthTiles() {
  if (!apiKey) return null;

  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[earthScale, earthScale, earthScale]}
    >
      <TilesRenderer key={apiKey}>
        <TilesPlugin plugin={GoogleCloudAuthPlugin} args={[{ apiToken: apiKey }]} />
        <TilesAttributionOverlay
          className="earth-map-attribution"
          style={{ bottom: 126, right: 18, left: "auto" }}
        >
          <strong>Google Maps</strong>
        </TilesAttributionOverlay>
      </TilesRenderer>
    </group>
  );
}
