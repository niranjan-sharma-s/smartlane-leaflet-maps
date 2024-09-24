import { render, screen, fireEvent } from "@testing-library/react";
import { MapContainer } from "react-leaflet";
import LayerToggleControl from "../components/LayerToggleControl";
import L from "leaflet";
import React from "react";

// Mocking the useMap hook from react-leaflet
jest.mock("react-leaflet", () => ({
  useMap: jest.fn(),
}));

describe("LayerToggleControl", () => {
  let mockMap: any;

  beforeEach(() => {
    // Mock Leaflet's map object and methods
    mockMap = {
      eachLayer: jest.fn(),
      removeLayer: jest.fn(),
      addLayer: jest.fn(),
    };

    // Mock the useMap hook to return the mock map object
    (require("react-leaflet").useMap as jest.Mock).mockReturnValue(mockMap);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the layer toggle buttons", () => {
    render(<LayerToggleControl />);

    expect(screen.getByText(/streets/i)).toBeInTheDocument();
    expect(screen.getByText(/satellite/i)).toBeInTheDocument();
  });

  it("disables the streets button when streets layer is active", () => {
    render(<LayerToggleControl />);

    const streetsButton = screen.getByText(/streets/i);
    const satelliteButton = screen.getByText(/satellite/i);

    expect(streetsButton).toBeDisabled();
    expect(satelliteButton).not.toBeDisabled();
  });

  it("switches to satellite layer and disables the satellite button", () => {
    render(<LayerToggleControl />);

    const satelliteButton = screen.getByText(/satellite/i);

    // Click on satellite button to switch to satellite layer
    fireEvent.click(satelliteButton);

    expect(mockMap.addLayer).toHaveBeenCalled();
    expect(satelliteButton).toBeDisabled();
    expect(screen.getByText(/streets/i)).not.toBeDisabled();
  });

  it("switches to streets layer and disables the streets button after satellite", () => {
    render(<LayerToggleControl />);

    const satelliteButton = screen.getByText(/satellite/i);
    const streetsButton = screen.getByText(/streets/i);

    // Click on satellite button to switch to satellite layer
    fireEvent.click(satelliteButton);
    // Now streets button should be enabled and satellite button disabled
    expect(satelliteButton).toBeDisabled();
    expect(streetsButton).not.toBeDisabled();

    // Click on streets button to switch back
    fireEvent.click(streetsButton);
    // Now streets button should be disabled again and satellite button enabled
    expect(streetsButton).toBeDisabled();
    expect(satelliteButton).not.toBeDisabled();
  });
});
