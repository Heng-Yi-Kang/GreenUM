import { useState, useEffect } from "react";

export interface Stats {
  totalUsers: number;
  totalEvents: number;
  activeEvents: number;
  impactScore: number;
  co2Reduced: string;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalEvents: 0,
    activeEvents: 0,
    impactScore: 0,
    co2Reduced: "0.0",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/stats", {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Failed to fetch stats" }));
          throw new Error(errorData.error || "Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to fetch stats";
        setError(errorMsg);
        console.error("Error fetching stats:", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
  };
};
