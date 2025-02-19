import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
  }

  try {
    // Using Overpass API for precise hospital search
    const overpassQuery = `
      [out:json];
      node["amenity"="hospital"](around:2500, ${lat}, ${lon});
      out;
    `;

    const overpassURL = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    const response = await fetch(overpassURL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    

    const hospitals = data.elements.map((item: any) => ({
      name: item.tags.name || "Unknown Hospital",
      address: item.tags["addr:full"] || "Address not available",
      contact: item.tags.phone || "Not available",
      lat: item.lat,
      lon: item.lon,
    }));

    return NextResponse.json({ hospitals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
  }
}
