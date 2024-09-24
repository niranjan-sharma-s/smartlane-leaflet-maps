import React from "react";
import { Location } from "../types/location";
import "../styles/SideBar.scss";

interface SidebarProps {
  locations: Location[];
  onLocationClick: (Location: Location) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ locations, onLocationClick }) => {
  return (
    <div className="sideBar">
      <ul>
        {locations.map((location) => (
          <li key={location.id} onClick={() => onLocationClick(location)}>
            {location.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
