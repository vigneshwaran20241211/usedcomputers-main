"use client"
import React, { useState, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const LocationAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const autocompleteService = useRef<any>(null);

  // Initialize Google Autocomplete Service
  const initializeService = () => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  };

  // Handle Input Change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions: any[], status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const suggestionsList = predictions.map((prediction) => prediction.description);
            setSuggestions(suggestionsList);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search location..."
        onFocus={initializeService}
      />
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", listStyle: "none", padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
