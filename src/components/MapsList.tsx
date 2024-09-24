import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../types/location";
import "../styles/MapList.scss";
import MapView from "./MapView";
import LayerToggleControl from "./LayerToggleControl";

interface MapsListProps {
  locations: Location[];
  center: LatLngExpression;
  zoom: number;
}

// Custom icon for map markers
const customIcon = L.icon({
  iconUrl: "../icons/icon-red.jpg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Main map component
const MapsList: React.FC<MapsListProps> = ({ locations, center, zoom }) => {
  const defaultPosition: LatLngExpression = [0, 0];

  return (
    <div className="mapContainer" data-testid="mapContainer">
      <MapContainer
        center={defaultPosition}
        //zoom={zoom}
        minZoom={2}
        maxZoom={13}
        className="leafletContainer"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LayerToggleControl />
        <MapView mapCenter={center} mapZoom={zoom} />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={customIcon}
          >
            <Popup className="leafletPopup">
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <a href={location.moreInfoLink} target="_blank">
                More Info
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapsList;
