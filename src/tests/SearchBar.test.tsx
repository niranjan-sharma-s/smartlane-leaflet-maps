import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar component", () => {
  const mockSetSearchQuery = jest.fn();
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    mockSetSearchQuery.mockClear(); // Clear the mock before each test
  });

  test("renders search input with correct initial value", () => {
    // Initial value for the search query
    const initialSearchQuery = "Berlin";

    render(
      <SearchBar
        searchQuery={initialSearchQuery}
        setSearchQuery={mockSetSearchQuery}
        handleSearch={mockHandleSearch}
      />
    );

    // Check if the input element is in the document
    const inputElement = screen.getByPlaceholderText(/search locations.../i);

    // Check that the input element has the correct initial value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialSearchQuery);
  });

  test("calls setSearchQuery on input change", () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        handleSearch={mockHandleSearch}
      />
    );

    // Get the input element
    const inputElement = screen.getByPlaceholderText(/search locations.../i);

    // Simulate typing in the search bar
    fireEvent.change(inputElement, { target: { value: "Munich" } });

    // Assert that setSearchQuery is called with the correct value
    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledWith("Munich");
  });

  test("displays the correct search query after typing", () => {
    const searchQuery = "Hamburg";

    render(
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={mockSetSearchQuery}
        handleSearch={mockHandleSearch}
      />
    );

    // Get the input element
    const inputElement = screen.getByPlaceholderText(/search locations.../i);

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: searchQuery } });

    // Check if the input value is updated correctly
    expect(inputElement).toHaveValue(searchQuery);
  });
});
