import { useQuery } from "@tanstack/react-query";
import { LightningStrike } from "@shared/schema";

export function useLightning() {
  const query = useQuery<LightningStrike[]>({
    queryKey: ["/api/lightning"],
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const formatTimeAgo = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return diffInSeconds <= 5 ? 'Just now' : `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      return minutes > 0 ? `${hours}h ${minutes}m ago` : `${hours}h ago`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-US', options);
    }
  };

  const getIntensityBars = (intensity: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
      key: i,
      isActive: i < intensity,
      className: `w-2 h-1 rounded ${i < intensity ? 'bg-warning' : 'bg-gray-300'}`
    }));
  };

  return {
    ...query,
    formatTimeAgo,
    getIntensityBars,
  };
}
