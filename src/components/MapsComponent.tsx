import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";
import MapsList from "./MapsList";
import { Location } from "../types/location";
import "../styles/MapsComponent.scss";
import { useLocation } from "../hooks/LocationContext";
import "leaflet/dist/leaflet.css";

const MapsComponent = () => {
  const { locations, loading } = useLocation();
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [mapZoom, setMapZoom] = useState<number>(2);

  const handleLocationClick = (location: Location) => {
    setMapCenter([location.lat, location.lng]);
    setMapZoom(13);
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter((location: any) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mapsComponent">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="content">
        <Sidebar
          locations={filteredLocations}
          onLocationClick={handleLocationClick}
        />
        <MapsList
          locations={filteredLocations}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
};

export default MapsComponent;
