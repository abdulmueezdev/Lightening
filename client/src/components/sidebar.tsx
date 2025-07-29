import { useState } from "react";
import CitySearch from "@/components/city-search";
import WeatherCard from "@/components/weather-card";
import LightningAlerts from "@/components/lightning-alerts";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  selectedLocation: { lat: number; lon: number; name: string } | null;
  onLocationSelect: (location: { lat: number; lon: number; name: string }) => void;
}

export default function Sidebar({ selectedLocation, onLocationSelect }: SidebarProps) {
  const [lightningAlertsEnabled, setLightningAlertsEnabled] = useState(true);
  const [soundNotificationsEnabled, setSoundNotificationsEnabled] = useState(false);

  return (
    <aside className="w-80 bg-surface shadow-xl border-r border-gray-200 flex flex-col">
      {/* Search Section */}
      <div className="p-6 border-b border-gray-200">
        <CitySearch onLocationSelect={onLocationSelect} />
      </div>

      {/* Current Weather Section */}
      <div className="p-6 border-b border-gray-200">
        <WeatherCard selectedLocation={selectedLocation} />
      </div>

      {/* Lightning Alerts Section */}
      <div className="p-6 flex-1 overflow-y-auto">
        <LightningAlerts enabled={lightningAlertsEnabled} />
      </div>

      {/* Settings Section */}
      <div className="p-6 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="lightning-alerts" className="text-sm font-medium text-gray-700">
              Lightning Alerts
            </Label>
            <Switch
              id="lightning-alerts"
              checked={lightningAlertsEnabled}
              onCheckedChange={setLightningAlertsEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-notifications" className="text-sm font-medium text-gray-700">
              Sound Notifications
            </Label>
            <Switch
              id="sound-notifications"
              checked={soundNotificationsEnabled}
              onCheckedChange={setSoundNotificationsEnabled}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
