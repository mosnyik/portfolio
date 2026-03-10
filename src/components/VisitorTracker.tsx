"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/app/actions";
import { categorizeReferrer } from "@/utils/referrerUtils";
import { GeoLocation } from "@/types/visitTypes";

function getOrCreateVisitorId(): string {
  const VISITOR_ID_KEY = "portfolio_visitor_id";

  if (typeof window === "undefined") {
    return "server-side";
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    // Generate a unique ID using crypto API
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

async function getGeoLocation(): Promise<GeoLocation> {
  try {
    const response = await fetch("/api/track");
    if (!response.ok) {
      throw new Error("Failed to fetch geolocation");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return { country: "Unknown", city: "Unknown", region: "" };
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const hasTracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    const trackingKey = pathname;
    if (hasTracked.current.has(trackingKey)) {
      return;
    }

    const trackVisit = async () => {
      try {
        const visitorId = getOrCreateVisitorId();
        const referrerUrl = document.referrer;
        const currentHostname = window.location.hostname;
        const { category, sourceName } = categorizeReferrer(
          referrerUrl,
          currentHostname
        );

        // Get geolocation
        const geoLocation = await getGeoLocation();

        await recordVisit({
          page: pathname,
          referrerUrl: referrerUrl,
          sourceCategory: category,
          sourceName: sourceName,
          userAgent: navigator.userAgent,
          visitorId: visitorId,
          country: geoLocation.country,
          city: geoLocation.city,
          region: geoLocation.region,
        });

        hasTracked.current.add(trackingKey);
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    const timeoutId = setTimeout(trackVisit, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
