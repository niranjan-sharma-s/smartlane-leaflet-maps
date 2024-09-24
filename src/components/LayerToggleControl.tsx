import L from "leaflet";
import React from "react";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

const LayerToggleControl = () => {
  const map = useMap();
  const [currentLayer, setCurrentLayer] = useState<string>("streets");
  const [layers, setLayers] = useState<{
    streets: L.TileLayer;
    satellite: L.TileLayer;
  }>({
    streets: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    satellite: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"),
  });

  useEffect(() => {
    layers.streets.addTo(map);
    return () => {
      map.eachLayer((layer) => {
        map.removeLayer(layer);
      });
    };
  }, [map, layers]);

  const handleLayerChange = (layerType: string) => {
    if (currentLayer === "streets") {
      map.removeLayer(layers.streets);
    } else {
      map.removeLayer(layers.satellite);
    }

    // Add the new layer based on the selected type
    if (layerType === "streets") {
      layers.streets.addTo(map);
      setCurrentLayer("streets");
    } else if (layerType === "satellite") {
      layers.satellite.addTo(map);
      setCurrentLayer("satellite");
    }
  };

  return (
    <div className="layer-toggle-control">
      <button
        onClick={() => handleLayerChange("streets")}
        disabled={currentLayer === "streets"}
      >
        Streets
      </button>
      <button
        onClick={() => handleLayerChange("satellite")}
        disabled={currentLayer === "satellite"}
      >
        Satellite
      </button>
    </div>
  );
};

export default LayerToggleControl;
