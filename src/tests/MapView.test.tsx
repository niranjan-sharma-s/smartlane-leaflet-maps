import { render, screen } from "@testing-library/react";
import MapView from "../components/MapView"; // Adjust the path as necessary
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import React from "react";

// Mock the useMap hook
jest.mock("react-leaflet", () => ({
  useMap: jest.fn(),
}));

describe("MapView Component", () => {
  const mockSetView = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Mock useMap to return an object with setView function
    (useMap as jest.Mock).mockReturnValue({
      setView: mockSetView,
    });
  });

  it("should update map center and zoom when props change", () => {
    const mapCenter: LatLngExpression = [48.1351, 11.582]; // Munich coordinates
    const mapZoom = 10;

    // Render the MapView component
    render(<MapView mapCenter={mapCenter} mapZoom={mapZoom} />);

    // Assert that setView was called with the correct arguments
    expect(mockSetView).toHaveBeenCalledWith(mapCenter, mapZoom);
  });

  it("should not call setView if mapCenter or mapZoom is missing", () => {
    // Render the component with no mapZoom
    render(
      <MapView mapCenter={[48.1351, 11.582]} mapZoom={undefined as any} />
    );

    // Ensure setView is not called when mapZoom is not provided
    expect(mockSetView).not.toHaveBeenCalled();

    // Render the component with no mapCenter
    render(<MapView mapCenter={undefined as any} mapZoom={10} />);

    // Ensure setView is not called when mapCenter is not provided
    expect(mockSetView).not.toHaveBeenCalled();
  });
});
