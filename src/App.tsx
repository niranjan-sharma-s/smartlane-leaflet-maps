import React from "react";
import MapsComponent from "./components/MapsComponent";
import { LocationProvider } from "./hooks/LocationContext";

function App() {
  return (
    <div>
      <LocationProvider>
        <MapsComponent />
      </LocationProvider>
    </div>
  );
}

export default App;
