export default async function getTopBar() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/topBar`);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    console.log(data);
    return data.data; // adjust based on your API response structure
  } catch (error) {
    console.error("Failed to fetch topBar:", error);
    return "Contact Us +91 70336 50159";
  }
}
