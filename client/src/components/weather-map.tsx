import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LightningStrike } from "@shared/schema";
import { initializeMap } from "@/lib/mapbox";
import { 
  ZoomIn, 
  ZoomOut, 
  Home, 
  Maximize, 
  Zap, 
  Cloud, 
  Satellite,
  Database,
  Clock,
  Thermometer
} from "lucide-react";

interface WeatherMapProps {
  selectedLocation: { lat: number; lon: number; name: string } | null;
  isConnected: boolean;
}

export default function WeatherMap({ selectedLocation, isConnected }: WeatherMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'lightning' | 'weather' | 'radar'>('lightning');
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lon: -122.4194 });

  const { data: lightningStrikes = [] } = useQuery<LightningStrike[]>({
    queryKey: ["/api/lightning"],
    queryFn: async () => {
      const response = await fetch('/api/lightning');
      if (!response.ok) {
        throw new Error('Failed to fetch lightning data');
      }
      const data = await response.json();
      return data.map((strike: any) => ({
        ...strike,
        timestamp: new Date(strike.timestamp)
      }));
    },
    refetchInterval: isConnected ? 10000 : false,
    enabled: isConnected,
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapInstance = initializeMap(mapContainer.current);
    
    if (mapInstance) {
      map.current = mapInstance;
      
      mapInstance.on('load', () => {
        setMapLoaded(true);
      });

      mapInstance.on('mousemove', (e: any) => {
        setCoordinates({
          lat: e.lngLat.lat,
          lon: e.lngLat.lng
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map center when location changes
  useEffect(() => {
    if (map.current && selectedLocation && mapLoaded) {
      map.current.flyTo({
        center: [selectedLocation.lon, selectedLocation.lat],
        zoom: 10,
        duration: 2000
      });
    }
  }, [selectedLocation, mapLoaded]);

  // Update lightning strikes on map
  useEffect(() => {
    if (!map.current || !mapLoaded || activeLayer !== 'lightning') return;

    // Remove existing lightning markers
    const existingMarkers = document.querySelectorAll('.lightning-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new lightning strike markers
    lightningStrikes.forEach((strike, index) => {
      const markerEl = document.createElement('div');
      markerEl.className = 'lightning-marker';
      
      // Determine size and color based on intensity
      const intensity = strike.intensity;
      let size, color, pulseColor;
      
      if (intensity >= 8) {
        size = '24px';
        color = '#ef4444'; // red-500
        pulseColor = '#fca5a5'; // red-300
      } else if (intensity >= 5) {
        size = '20px';
        color = '#f59e0b'; // amber-500
        pulseColor = '#fcd34d'; // amber-300
      } else {
        size = '16px';
        color = '#eab308'; // yellow-500
        pulseColor = '#fde047'; // yellow-300
      }
      
      markerEl.innerHTML = `
        <div style="position: relative; width: ${size}; height: ${size};">
          <div style="
            width: ${size}; 
            height: ${size}; 
            background-color: ${pulseColor}; 
            border-radius: 50%; 
            animation: lightning-pulse 1s ease-in-out infinite;
            position: absolute;
          "></div>
          <div style="
            width: ${size}; 
            height: ${size}; 
            background-color: ${color}; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            position: absolute;
            z-index: 10;
          ">
            ⚡
          </div>
        </div>
      `;

      // Create marker with Mapbox
      if (window.mapboxgl) {
        new window.mapboxgl.Marker(markerEl)
          .setLngLat([strike.coordinates.lon, strike.coordinates.lat])
          .addTo(map.current!);
      }
    });
  }, [lightningStrikes, mapLoaded, activeLayer]);

  // Clear lightning markers when switching away from lightning layer
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    if (activeLayer !== 'lightning') {
      const existingMarkers = document.querySelectorAll('.lightning-marker');
      existingMarkers.forEach(marker => marker.remove());
    }
  }, [activeLayer, mapLoaded]);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 9,
        duration: 2000
      });
    }
  };

  const handleFullscreen = () => {
    if (mapContainer.current) {
      if (mapContainer.current.requestFullscreen) {
        mapContainer.current.requestFullscreen();
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Map Controls */}
      <div className="bg-surface dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Interactive Map</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeLayer === 'lightning' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveLayer('lightning')}
                title="Show live lightning strikes on the map"
              >
                <Zap className="mr-1 h-4 w-4" />
                Lightning
              </Button>
              <Button
                variant={activeLayer === 'weather' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveLayer('weather')}
                title="Show weather overlays and temperature data"
              >
                <Cloud className="mr-1 h-4 w-4" />
                Weather
              </Button>
              <Button
                variant={activeLayer === 'radar' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveLayer('radar')}
                title="Show weather radar and precipitation data"
              >
                <Satellite className="mr-1 h-4 w-4" />
                Radar
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleResetView}>
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Map Legend and Layer Info */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {activeLayer === 'lightning' ? 'Lightning Activity' : 
             activeLayer === 'weather' ? 'Weather Data' : 'Radar View'}
          </h4>
          
          {activeLayer === 'lightning' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">High Intensity (8+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Medium Intensity (5-7)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Low Intensity (1-4)</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Live lightning strikes updated every 10 seconds
              </p>
            </div>
          )}
          
          {activeLayer === 'weather' && (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Shows temperature overlays, wind patterns, and weather conditions
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Feature in development - will display weather data layers
              </p>
            </div>
          )}
          
          {activeLayer === 'radar' && (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Displays precipitation radar and storm tracking data
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Feature in development - will show weather radar imagery
              </p>
            </div>
          )}
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-2 rounded-lg text-sm font-mono">
          {coordinates.lat.toFixed(4)}°N, {Math.abs(coordinates.lon).toFixed(4)}°W
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-surface border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Database className="w-3 h-3" />
              <span>API Status: </span>
              <span className="text-success font-medium">Connected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Last Update: </span>
              <span>2 seconds ago</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Lightning Strikes: </span>
              <span className="font-medium text-warning">{lightningStrikes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Thermometer className="w-3 h-3" />
              <span>Temp Range: </span>
              <span className="font-medium">18°C - 24°C</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
