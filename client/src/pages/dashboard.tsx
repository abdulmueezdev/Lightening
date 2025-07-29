import { useState } from "react";
import Sidebar from "@/components/sidebar";
import WeatherMap from "@/components/weather-map";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-bolt text-secondary text-2xl"></i>
              <h1 className="text-2xl font-bold">Storm Watch Sky</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <i className="fas fa-wifi text-success"></i>
                <span>Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        <Sidebar 
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
        <WeatherMap selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}
