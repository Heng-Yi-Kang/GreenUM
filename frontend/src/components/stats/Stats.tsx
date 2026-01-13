import { Calendar, Users } from "lucide-react";
import { useStats } from "@/hooks/useStats";

type StatsProps = {
  eventsLength: number;
};

const Stats = ({ eventsLength }: StatsProps) => {
  const { stats, loading } = useStats();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-linear-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-colors duration-300 rounded-xl p-5 text-white shadow-lg shadow-green-600/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white">
              This Month
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{eventsLength}</div>
          <div className="text-green-100 text-sm">Active Events</div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Participants
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {loading ? "..." : stats.totalUsers > 0 ? stats.totalUsers : "0"}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            <span>Registered Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
