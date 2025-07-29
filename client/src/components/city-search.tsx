import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, Navigation } from "lucide-react";
import { CitySearchResult } from "@shared/schema";

interface CitySearchProps {
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
}

export default function CitySearch({ onLocationSelect }: CitySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [], isLoading } = useQuery<CitySearchResult[]>({
    queryKey: ["/api/cities/search", searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/cities/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search cities');
      }
      return response.json();
    },
    enabled: searchQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: CitySearchResult) => {
    setSearchQuery(suggestion.placeName);
    setShowSuggestions(false);
    onLocationSelect({
      lat: suggestion.coordinates.lat,
      lon: suggestion.coordinates.lon,
      name: suggestion.placeName,
    });
  };

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSelect({
            lat: latitude,
            lon: longitude,
            name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <Label htmlFor="citySearch" className="block text-sm font-medium text-gray-700 mb-2">
        Search City
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="citySearch"
          type="text"
          placeholder="Enter city name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-12"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCurrentLocation}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 text-primary hover:text-blue-700"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-gray-400"></i>
                  <span className="text-sm">{suggestion.placeName}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
}
