import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapViewProps {
  mapCenter: LatLngExpression;
  mapZoom: number;
}

const MapView: React.FC<MapViewProps> = ({ mapCenter, mapZoom }) => {
  const map = useMap();

  useEffect(() => {
    if (mapCenter && mapZoom) {
      map.setView(mapCenter, mapZoom);
    }
  }, [mapCenter, mapZoom, map]);

  return null;
};

export default MapView;
