import React, { createContext, useContext, useState, ReactNode } from "react";
import useFetchLocations from "./useFetchLocations";
import { Location } from "../types/location";

interface LocationContextType {
  locations: Location[];
  loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Create a provider component
export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { locations, loading } = useFetchLocations();

  return (
    <LocationContext.Provider value={{ locations, loading }}>
      {children}
    </LocationContext.Provider>
  );
};

// Create a custom hook to use the LocationContext
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
