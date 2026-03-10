"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAnalyticsSummary } from "@/app/actions";
import { AnalyticsSummary, TrafficSource } from "@/types/visitTypes";
import {
  Users,
  TrendingUp,
  Globe,
  Search,
  Share2,
  FileText,
  Link,
  MapPin,
  UserCheck,
  Repeat,
} from "lucide-react";

const SOURCE_COLORS: Record<TrafficSource, string> = {
  social: "bg-blue-500",
  search: "bg-green-500",
  blog: "bg-purple-500",
  direct: "bg-orange-500",
  other: "bg-gray-500",
};

const SOURCE_ICONS: Record<TrafficSource, typeof Users> = {
  social: Share2,
  search: Search,
  blog: FileText,
  direct: Link,
  other: Globe,
};

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getAnalyticsSummary();
        setAnalytics(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data");
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#19485F]"></div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || "Failed to load analytics"}
      </div>
    );
  }

  const totalSourceVisits = Object.values(analytics.sourceBreakdown).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#19485F] mb-6">
        Visitor Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#19485F] to-[#2a6a8a] text-white p-5 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Total Page Views</p>
              <p className="text-3xl font-bold">
                {analytics.totalVisits.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-600 to-green-400 text-white p-5 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">This Month</p>
              <p className="text-3xl font-bold">
                {analytics.monthlyVisits.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-5 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Unique Visitors</p>
              <p className="text-3xl font-bold">
                {analytics.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            <Users className="w-10 h-10 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-5 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Monthly Unique</p>
              <p className="text-3xl font-bold">
                {analytics.monthlyUniqueVisitors.toLocaleString()}
              </p>
            </div>
            <UserCheck className="w-10 h-10 opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Source Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md border"
        >
          <h3 className="text-xl font-semibold text-[#19485F] mb-4">
            Traffic Sources (This Month)
          </h3>
          <div className="space-y-4">
            {(
              Object.entries(analytics.sourceBreakdown) as [TrafficSource, number][]
            ).map(([source, count]) => {
              const percentage =
                totalSourceVisits > 0
                  ? Math.round((count / totalSourceVisits) * 100)
                  : 0;
              const Icon = SOURCE_ICONS[source];

              return (
                <div key={source} className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded ${SOURCE_COLORS[source]} text-white`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {source}
                      </span>
                      <span className="text-sm text-gray-500">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${SOURCE_COLORS[source]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md border"
        >
          <h3 className="text-xl font-semibold text-[#19485F] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Visitor Locations (This Month)
          </h3>
          {analytics.topLocations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No location data yet</p>
          ) : (
            <div className="space-y-2">
              {analytics.topLocations.map((location, index) => (
                <div
                  key={location.location}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-gray-700">{location.location}</span>
                  </div>
                  <span className="text-sm font-medium text-[#19485F]">
                    {location.count} visits
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Two Column Layout - Referrers and Repeat Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-md border"
        >
          <h3 className="text-xl font-semibold text-[#19485F] mb-4">
            Top Referrers (This Month)
          </h3>
          {analytics.topReferrers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No referrer data yet</p>
          ) : (
            <div className="space-y-2">
              {analytics.topReferrers.map((referrer, index) => (
                <div
                  key={referrer.name}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-gray-700">{referrer.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#19485F]">
                    {referrer.count} visits
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Repeat Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-lg shadow-md border"
        >
          <h3 className="text-xl font-semibold text-[#19485F] mb-4 flex items-center gap-2">
            <Repeat className="w-5 h-5" />
            Repeat Visitors (This Month)
          </h3>
          {analytics.repeatVisitors.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No repeat visitors yet</p>
          ) : (
            <div className="space-y-2">
              {analytics.repeatVisitors.map((visitor, index) => (
                <div
                  key={visitor.visitorId}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <span className="text-gray-700 font-mono text-sm">
                        {visitor.visitorId}
                      </span>
                      {visitor.country && (
                        <span className="text-xs text-gray-500 ml-2">
                          ({visitor.country})
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#19485F]">
                    {visitor.visitCount} visits
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Daily Trend - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-md border"
      >
        <h3 className="text-xl font-semibold text-[#19485F] mb-4">
          Daily Visitors (Last 30 Days)
        </h3>
        {analytics.dailyVisits.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No visit data yet</p>
        ) : (
          <>
            <div className="flex items-end justify-between h-40 gap-1">
              {analytics.dailyVisits.slice(-30).map((day) => {
                const maxCount = Math.max(
                  ...analytics.dailyVisits.map((d) => d.count),
                  1
                );
                const height = (day.count / maxCount) * 100;

                return (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center group relative"
                  >
                    <div
                      className="w-full bg-[#19485F] rounded-t hover:bg-[#2a6a8a] transition-colors cursor-pointer"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${day.date}: ${day.count} visits`}
                    />
                    <div className="hidden group-hover:block absolute -bottom-8 text-xs text-gray-500 whitespace-nowrap z-10 bg-white px-1 rounded shadow">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      : {day.count}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
