import { useEffect, useState } from "react";
import axios from "axios";
import { Location } from "../types/location";

const useFetchLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/locations.json")
      .then((response) => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return { locations, loading };
};

export default useFetchLocations;
