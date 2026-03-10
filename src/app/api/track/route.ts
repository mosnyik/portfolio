import { NextRequest, NextResponse } from "next/server";
import { GeoLocation } from "@/types/visitTypes";

export async function GET(request: NextRequest) {
  try {
    // Get IP from headers (works on Vercel and most hosting providers)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const ip = forwardedFor?.split(",")[0].trim() || realIp || "unknown";

    // Skip geolocation for localhost/private IPs
    if (ip === "unknown" || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      return NextResponse.json({
        country: "Local",
        city: "Development",
        region: "",
      } as GeoLocation);
    }

    // Use ip-api.com (free, no API key required, 45 requests/minute limit)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!geoResponse.ok) {
      throw new Error("Geolocation API failed");
    }

    const geoData = await geoResponse.json();

    if (geoData.status === "fail") {
      return NextResponse.json({
        country: "Unknown",
        city: "Unknown",
        region: "",
      } as GeoLocation);
    }

    return NextResponse.json({
      country: geoData.country || "Unknown",
      city: geoData.city || "Unknown",
      region: geoData.regionName || "",
    } as GeoLocation);
  } catch (error) {
    console.error("Error getting geolocation:", error);
    return NextResponse.json({
      country: "Unknown",
      city: "Unknown",
      region: "",
    } as GeoLocation);
  }
}
