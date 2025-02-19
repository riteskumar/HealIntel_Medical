import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=5&lat=${lat}&lon=${lon}`,
      {
        headers: { "User-Agent": "HealIntel/1.0 (http://localhost:3000)" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    const hospitals = data.map((item: any) => ({
      name: item.display_name.split(",")[0],
      address: item.display_name,
      contact: "Not available",
    }));

    return NextResponse.json({ hospitals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
  }
}
