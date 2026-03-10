export type TrafficSource = "social" | "search" | "blog" | "direct" | "other";

export interface Visit {
  id?: string;
  timestamp: Date;
  page: string;
  referrerUrl: string;
  sourceCategory: TrafficSource;
  sourceName: string;
  userAgent: string;
  visitorId: string;
  country?: string;
  city?: string;
  region?: string;
}

export interface Visitor {
  id: string;
  visitorId: string;
  firstVisit: Date;
  lastVisit: Date;
  totalVisits: number;
  country?: string;
  city?: string;
}

export interface MonthlyVisitorStats {
  visitorId: string;
  month: string; // Format: "YYYY-MM"
  visitCount: number;
}

export interface AnalyticsSummary {
  totalVisits: number;
  monthlyVisits: number;
  uniqueVisitors: number;
  monthlyUniqueVisitors: number;
  sourceBreakdown: Record<TrafficSource, number>;
  topReferrers: Array<{ name: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  dailyVisits: Array<{ date: string; count: number }>;
  repeatVisitors: Array<{ visitorId: string; visitCount: number; country?: string }>;
}

export interface GeoLocation {
  country: string;
  city: string;
  region: string;
}
