import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/SideBar";
import { Location } from "../types/location";
import { act } from "react";

// Mock data
const mockLocations: Location[] = [
  {
    id: "1",
    name: "Berlin",
    description: "Capital of Germany",
    lat: 52.52,
    lng: 13.405,
  },
  {
    id: "2",
    name: "Munich",
    description: "City in Bavaria",
    lat: 48.1351,
    lng: 11.582,
  },
  {
    id: "3",
    name: "Hamburg",
    description: "City in northern Germany",
    lat: 53.5511,
    lng: 9.9937,
  },
];

// Mock function for location click handler
const mockOnLocationClick = jest.fn();

describe("Sidebar component", () => {
  beforeEach(() => {
    // Clear mock function before each test
    mockOnLocationClick.mockClear();
  });

  test("renders list of locations", () => {
    render(
      <Sidebar
        locations={mockLocations}
        onLocationClick={mockOnLocationClick}
      />
    );

    mockLocations.forEach((location) => {
      expect(screen.getByText(location.name)).toBeInTheDocument();
    });
  });

  test("calls onLocationClick when a location is clicked", () => {
    render(
      <Sidebar
        locations={mockLocations}
        onLocationClick={mockOnLocationClick}
      />
    );

    // Act is usually handled by testing library, but for manual actions:
    act(() => {
      fireEvent.click(screen.getByText(mockLocations[0].name));
    });

    expect(mockOnLocationClick).toHaveBeenCalledTimes(1);
    expect(mockOnLocationClick).toHaveBeenCalledWith(mockLocations[0]);
  });

  test("handles an empty location list", () => {
    render(<Sidebar locations={[]} onLocationClick={mockOnLocationClick} />);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });
});
