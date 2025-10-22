import { headers } from "next/headers";

export default async function getTopBar() {
  const headersList = await headers(); // ✅ Await the Promise
  const host = headersList.get("host"); // ✅ Works now

  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/topBar`, {
    next: { revalidate: 360000 }, // optional caching
  });

  if (!res.ok) throw new Error("Failed to fetch topbar");
  const data = await res.json();
  return data.data;
}
